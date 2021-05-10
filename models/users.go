package models

import (
	"encoding/json"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"net/http"
)

type User struct {
	Nuserkey         int    `json:"nuserkey"`
	Cidentificator   string `json:"cidentificator"`
	Cpassword        string `json:"cpassword"`
	Cuserfamilyname  string `json:"cuserfamilyname"`
	Cuserfirstname   string `json:"cuserfirstname"`
	Cusersurname     string `json:"cusersurname"`
	Norganizationkey int    `json:"norganizationkey"`
	Nusertypekey     int    `json:"nusertypekey"`
}

type AuthUser struct {
	User struct {
		Nuserkey         int    `json:"nuserkey"`
		Fullname         string `json:"full_name"`
		Cidentificator   string `json:"cidentificator"`
		Norganizationkey int    `json:"norganizationkey"`
		Nusertypekey     int    `json:"nusertypekey"`
	} `json:"user"`
	Token string `json:"token"`
}

var users []User
var user User
var authUser AuthUser

func GetUsers() []User {
	if authUser.User.Nusertypekey == 533 {
		db.Raw("SELECT * FROM users "+
			"WHERE nuserkey != ? and nusertypekey = 532",
			authUser.User.Nuserkey).Scan(&users)
	} else {
		db.Raw("SELECT * FROM users "+
			"WHERE nusertypekey = 531 AND norganizationkey = ?",
			authUser.User.Norganizationkey).Scan(&users)
	}

	return users
}

func GetUser(nuserkey string) User {
	db.Raw("SELECT * FROM users WHERE nuserkey = ?",
		nuserkey).Scan(&user)

	return user
}

func DeleteUser(nuserkey string) {
	db.Exec("DELETE FROM users WHERE nuserkey = ?", nuserkey)
	db.Exec(fmt.Sprintf("DROP USER %s", user.Cidentificator))
}

func AddUser(r *http.Request) User {
	_ = json.NewDecoder(r.Body).Decode(&user)

	db.Exec(""+
		"INSERT INTO users "+
		"(cidentificator, cuserfamilyname, cuserfirstname, "+
		"cusersurname, norganizationkey, nusertypekey, cpassword)"+
		"VALUES (?, ?, ?, ?, ?, ?, ?)",
		user.Cidentificator,
		user.Cuserfamilyname,
		user.Cuserfirstname,
		user.Cusersurname,
		user.Norganizationkey,
		user.Nusertypekey,
		user.Cpassword)

	db.Raw("SELECT last_value as nuserkey FROM users_nuserkey_seq").Scan(&user)

	db.Exec(fmt.Sprintf("CREATE USER %s WITH PASSWORD '%s'",
		user.Cidentificator, user.Cpassword))

	CreateDbUser(authUser.User.Nusertypekey, user.Cidentificator)

	return user
}

func SearchUsers(r *http.Request) []User {
	_ = json.NewDecoder(r.Body).Decode(&user)

	if authUser.User.Nusertypekey == 533 {
		db.Raw("select * from users "+
			"WHERE "+
			"(nuserkey != ? and nusertypekey = 532) "+
			"AND "+
			"cusersurname = ? "+
			"OR "+
			"(nuserkey != ? and nusertypekey = 532) "+
			"AND "+
			"cuserfirstname = ? "+
			"OR "+
			"(nuserkey != ? and nusertypekey = 532) "+
			"AND cuserfamilyname = ? "+
			"OR "+
			"(nuserkey != ? and nusertypekey = 532) "+
			"AND cidentificator = ? "+
			"OR "+
			"(nuserkey != ? and nusertypekey = 532) "+
			"AND norganizationkey = ? "+
			"OR "+
			"(nuserkey != ? and nusertypekey = 532) "+
			"AND nuserkey = ?",
			authUser.User.Nuserkey, user.Cusersurname,
			authUser.User.Nuserkey, user.Cuserfirstname,
			authUser.User.Nuserkey, user.Cuserfamilyname,
			authUser.User.Nuserkey, user.Cidentificator,
			authUser.User.Nuserkey, user.Norganizationkey,
			authUser.User.Nuserkey, user.Nuserkey).Scan(&users)
	} else {
		db.Raw("select * from users "+
			"WHERE "+
			"(norganizationkey = ? and nusertypekey = 531) "+
			"AND "+
			"cusersurname = ? "+
			"OR "+
			"(norganizationkey = ? and nusertypekey = 531) "+
			"AND "+
			"cuserfirstname = ? "+
			"OR "+
			"(norganizationkey = ? and nusertypekey = 531) "+
			"AND cuserfamilyname = ? "+
			"OR "+
			"(norganizationkey = ? and nusertypekey = 531) "+
			"AND cidentificator = ? "+
			"OR "+
			"(norganizationkey = ? and nusertypekey = 531) "+
			"AND norganizationkey = ? "+
			"OR "+
			"(norganizationkey = ? and nusertypekey = 531) "+
			"AND nuserkey = ?",
			authUser.User.Norganizationkey, user.Cusersurname,
			authUser.User.Norganizationkey, user.Cuserfirstname,
			authUser.User.Norganizationkey, user.Cuserfamilyname,
			authUser.User.Norganizationkey, user.Cidentificator,
			authUser.User.Norganizationkey, user.Norganizationkey,
			authUser.User.Norganizationkey, user.Nuserkey).Scan(&users)
	}

	return users
}

func UpdateUser(r *http.Request) User {
	_ = json.NewDecoder(r.Body).Decode(&user)

	chnagedUser := user
	UpdateDbUser(chnagedUser.Cidentificator, chnagedUser.Cpassword, chnagedUser.Nuserkey)

	params := mux.Vars(r)

	db.Exec("UPDATE users SET "+
		"cidentificator = ?, "+
		"cuserfamilyname = ?, "+
		"cuserfirstname = ?, "+
		"cusersurname = ?, "+
		"norganizationkey = ?, "+
		"cpassword = ? "+
		"WHERE nuserkey = ?",
		chnagedUser.Cidentificator,
		chnagedUser.Cuserfamilyname,
		chnagedUser.Cuserfirstname,
		chnagedUser.Cusersurname,
		chnagedUser.Norganizationkey,
		chnagedUser.Cpassword,
		params["nuserkey"])

	return chnagedUser
}

func CreateDbUser(nusertypekey int, cidentificator string) {
	if nusertypekey == 533 {
		println("will be moderator")
		db.Exec(fmt.Sprintf("GRANT moderator TO %s", cidentificator))
		db.Exec(fmt.Sprintf("ALTER USER %s CREATEROLE", cidentificator))
	} else {
		println("will be tested")
		db.Exec(fmt.Sprintf("GRANT tested TO %s", cidentificator))
	}
}

func UpdateDbUser(currCidentificator, currCpassword string, nuserkey int) {
	db.Raw("SELECT * FROM users WHERE nuserkey = ?",
		nuserkey).Scan(&user)

	prevCidentificator := user.Cidentificator
	prevCpassword := user.Cpassword

	if prevCidentificator != currCidentificator {
		db.Exec(fmt.Sprintf("ALTER USER %s RENAME TO %s",
			prevCidentificator, currCidentificator))
	}

	if prevCidentificator != currCidentificator && prevCpassword != currCpassword {
		db.Exec(fmt.Sprintf("ALTER USER %s WITH PASSWORD '%s'",
			currCidentificator, currCpassword))
	}

	if prevCpassword != currCpassword {
		db.Exec(fmt.Sprintf("ALTER USER %s WITH PASSWORD '%s'",
			currCidentificator, currCpassword))
	}
}

func GenerateJWT(cidentificator, cpassword string, key []byte) AuthUser {
	// init token generation
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)

	claims["cidentificator"] = cidentificator
	claims["cpassword"] = cpassword

	// verifying auth data
	if cidentificator == "postgres" {
		db.Raw("SELECT * FROM users WHERE Nusertypekey = 533").Scan(&user)
	} else {
		db.Raw("SELECT * FROM users WHERE cidentificator = ? AND cpassword = ?",
			cidentificator, cpassword).Scan(&user)
	}
	fmt.Println(user)

	// if incorrect data, function returns empty user
	if user.Nuserkey == 0 {
		return AuthUser{}
	}

	// else generates token and returns authUser
	tokenString, _ := token.SignedString(key)

	fullName := user.Cuserfamilyname + " " + user.Cuserfirstname + " " + user.Cusersurname

	authUser.User.Cidentificator = cidentificator
	authUser.User.Nusertypekey = user.Nusertypekey
	authUser.User.Norganizationkey = user.Norganizationkey
	authUser.User.Nuserkey = user.Nuserkey
	authUser.User.Fullname = fullName
	authUser.Token = tokenString

	// it is KASTIL to drop last auth user data from memory:)
	user = User{}
	return authUser
}

func Login(r *http.Request, key []byte) (AuthUser, string) {
	_ = json.NewDecoder(r.Body).Decode(&user)

	dbUser := user.Cidentificator
	dbPass := user.Cpassword

	conn := DbConnect(dbUser, dbPass)

	if conn {
		authUser := GenerateJWT(user.Cidentificator, user.Cpassword, key)
		return authUser, ""
	} else {
		return authUser, "Ошибка авторизации"
	}
}

func Logout() {
	authUser = AuthUser{}
}

func GetAuthUser() AuthUser {
	return authUser
}
