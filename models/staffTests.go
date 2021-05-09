package models

import (
	"encoding/json"
	"net/http"
)

type StaffTest struct {
	Nkey 			int `json:"nkey"`
	Ndolzhnostkey 	int `json:"ndolzhnostkey"`
	Ntestkey 		int `json:"ntestkey"`
}

var staffTest StaffTest
var staffTests []StaffTest

func GetStaffTests() []StaffTest {
	db.Raw("SELECT * FROM staff_test").Scan(&staffTests)
	return staffTests
}

func GetStaffTest(nkey string) StaffTest {
	db.Raw("SELECT * FROM staff_test WHERE nkey = ?", nkey).Scan(&staffTest)
	return staffTest
}

func DeleteStaffTest(nkey string) {
	db.Exec("DELETE FROM staff_test WHERE nkey = ?", nkey)
}

func AddStaffTest(r *http.Request) StaffTest {
	_ = json.NewDecoder(r.Body).Decode(&staffTest)

	db.Exec("INSERT INTO staff_test (ndolzhnostkey, ntestkey) " +
		"VALUES (?, ?)",
		staffTest.Ndolzhnostkey,
		staffTest.Ntestkey)

	db.Raw("SELECT last_value as nkey FROM staff_test_nkey_seq").Scan(&staffTest)

	return staffTest
}