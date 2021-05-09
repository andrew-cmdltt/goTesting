package models

import (
	"encoding/json"
	_ "encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"io/ioutil"
	"math/rand"
	"net/http"
	_ "net/http"
	"strconv"
	"strings"
)

type Test struct {
	Nkey         	int `json:"test_id"`
	Organization 	int `json:"organization"`
	Nstaffkey 		int `json:"nstaffkey"`
	Ctestname 		string `json:"ctestname"`
	Cmessage 		string `json:"cmessage"`
	Nmin1 			int `json:"nmin1"`
	Nmin2 			int `json:"nmin2"`
	Nmin3 			int `json:"nmin3"`
	Nmin4 			int `json:"nmin4"`
	Nmin5 			int `json:"nmin5"`
	Nmax1 			int `json:"nmax1"`
	Nmax2 			int `json:"nmax2"`
	Nmax3 			int `json:"nmax3"`
	Nmax4 			int `json:"nmax4"`
	Nmax5 			int `json:"nmax5"`
	Cvalue1 		string `json:"cvalue1"`
	Cvalue2 		string `json:"cvalue2"`
	Cvalue3 		string `json:"cvalue3"`
	Cvalue4 		string `json:"cvalue4"`
	Cvalue5 		string `json:"cvalue5"`
	Questions		[]Question `json:"questions"`
}

var tests []Test
var test Test

func GetTests() []Test {
	authUser := GetAuthUser()

	if authUser.User.Nusertypekey == 533 {
		db.Raw("" +
			"SELECT * FROM tests",
		).Scan(&tests)
	} else {
		db.Raw("SELECT * FROM tests as t " +
			"INNER JOIN staff_test as st ON t.nkey = st.ntestkey " +
			"WHERE st.ndolzhnostkey = ?",
			authUser.User.Nuserkey).Scan(&tests)
	}

	return tests
}

func GetTest(nkey string) Test{
	db.Raw("SELECT * FROM tests WHERE nkey = ?", nkey).Scan(&test)
	return test
}

func DeleteTest(nkey string) {
	db.Exec("DELETE FROM tests WHERE nkey = ?", nkey)
}

func AddTest(r *http.Request) (error, Test) {
	_ = json.NewDecoder(r.Body).Decode(&test)

	err := TestValidate(test)

	if err == nil {
		db.Exec(""+
			"INSERT INTO tests "+
			"(nstaffkey, ctestname, cmessage)"+
			"VALUES (?, ?, ?)",
			test.Nstaffkey,
			test.Ctestname,
			test.Cmessage)

		db.Raw("SELECT last_value as nkey FROM tests_nkey_seq").Scan(&test)
	}

	return err, test
}

func SearchTests(r *http.Request) []Test {
	_ = json.NewDecoder(r.Body).Decode(&test)

	if authUser.User.Nusertypekey == 533 {
		db.Raw("SELECT * " +
			"FROM tests as t " +
			"WHERE ctestname = ? OR organization = ?",
			test.Ctestname, test.Organization).Scan(&tests)
	} else {
		db.Raw("SELECT * " +
			"FROM tests as t " +
			"INNER JOIN staff_test as st ON t.nkey = st.ntestkey " +
			"WHERE (st.ndolzhnostkey = ? AND t.ctestname = ?) " +
			"OR " +
			"(st.ndolzhnostkey = ? AND t.organization = ?)",
			authUser.User.Nuserkey,
			test.Ctestname,
			authUser.User.Nuserkey,
			test.Organization).Scan(&tests)
	}

	return tests
}

func UpdateTest(r *http.Request) (error, Test) {
	_ = json.NewDecoder(r.Body).Decode(&test)
	params := mux.Vars(r)

	err := TestValidate(test)

	if err == nil {
		db.Exec("UPDATE tests SET " +
			"ctestname = ?, " +
			"cmessage = ?, " +
			"nmin1 = ?, nmin2 = ?, nmin3 = ?, nmin4 = ?, nmin5 = ?, " +
			"nmax1 = ?, nmax2 = ?, nmax3 = ?, nmax4 = ?, nmax5 = ?, " +
			"cvalue1 = ?, cvalue2 = ?, cvalue3 = ?, cvalue4 = ?, cvalue5 = ? " +
			"WHERE nkey = ?",
			test.Ctestname,
			test.Cmessage,
			test.Nmin1, test.Nmin2, test.Nmin3, test.Nmin4, test.Nmin5,
			test.Nmax1, test.Nmax2, test.Nmax3, test.Nmax4, test.Nmax5,
			test.Cvalue1, test.Cvalue2, test.Cvalue3, test.Cvalue4, test.Cvalue5,
			params["nkey"])
	}

	return err, test
}

func ExportTest(nkey string) Test {

	db.Raw("select * from tests where nkey = ?", nkey).Scan(&test)
	db.Raw("select * from tests_questions where ntestnumber = ?", nkey).Scan(&questions)

	test.Questions = questions
	return test
}

func ImportTest(r *http.Request) Test {
	file, _, err := r.FormFile("json")

	if err != nil {
		fmt.Println(err)
	}

	fileBytes, _ := ioutil.ReadAll(file)
	_ = json.Unmarshal(fileBytes, &test)

	test = AddTestHelper(test)
	AddQuestionsHelper(test.Questions, test.Nkey)

	return test
}

func AddTestHelper(test Test) Test {
	test.Ctestname = GenerateRandomName(test.Ctestname)

	db.Exec(""+
		"INSERT INTO tests "+
		"(nstaffkey, ctestname, cmessage, organization, " +
		"nmin1, nmin2, nmin3, nmin4, nmin5, " +
		"nmax1, nmax2, nmax3, nmax4, nmax5, " +
		"cvalue1, cvalue2, cvalue3, cvalue4, cvalue5) " +
		"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		test.Nstaffkey,
		test.Ctestname,
		test.Cmessage,
		test.Organization,
		test.Nmin1, test.Nmin3, test.Nmin3, test.Nmin4, test.Nmin5,
		test.Nmax1, test.Nmax3, test.Nmax3, test.Nmax4, test.Nmax5,
		test.Cvalue1, test.Cvalue2, test.Cvalue3, test.Cvalue4, test.Cvalue5)

	db.Raw("SELECT last_value as nkey FROM tests_nkey_seq").Scan(&test)
	return test
}

func AddQuestionsHelper(questions []Question, testId int) {
	for i := 0; i < len(questions); i++ {
		db.Exec("INSERT INTO tests_questions"+
			"(ntestnumber, cquestion, "+
			"nw1, nw2, nw3, nw4, nw5, nw6, "+
			"canswer1, canswer2,"+
			"canswer3, canswer4, canswer5, canswer6)"+
			"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			testId,
			questions[i].Cquestion,
			questions[i].Nw1,
			questions[i].Nw2,
			questions[i].Nw3,
			questions[i].Nw4,
			questions[i].Nw5,
			questions[i].Nw6,
			questions[i].Canswer1,
			questions[i].Canswer2,
			questions[i].Canswer3,
			questions[i].Canswer4,
			questions[i].Canswer5,
			questions[i].Canswer6)
	}
}

func GenerateRandomName(ctestname string) string {
	words := strings.Fields(ctestname)
	randomNumber := rand.Intn(1000000-100) + 1000000
	variantPointer := false

	for i := 0; i < len(words); i++ {
		if words[i] == "Вариант" {
			variantPointer = true
			if i != len(words) - 1 {
				words[i + 1] = strconv.Itoa(randomNumber)
			} else {
				words[i] +=  " " + strconv.Itoa(randomNumber)
			}
		}
	}

	if !variantPointer {
		randomNumber := rand.Intn(1000000 - 100) + 1000000
		ctestname += " Вариант " + strconv.Itoa(randomNumber)
		return ctestname
	}

	return strings.Join(words, " ")
}