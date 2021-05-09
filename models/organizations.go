package models

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

type Organization struct {
	Nelementkey  int    `json:"nelementkey"`
	Celementname string `json:"celementname"`
	Nparentkey   int    `json:"nparentkey"`
	Nlevel       uint   `json:"nlevel"`
}

var organizations []Organization
var organization Organization

func GetOrganizations() []Organization {
	db.Raw("SELECT * FROM dictionary_structure WHERE nparentkey = 310 OR nparentkey = 300").Scan(&organizations)

	return organizations
}

func GetOrganization(nelementkey string) Organization {
	db.Raw("SELECT * FROM dictionary_structure WHERE nelementkey = ?",
		nelementkey).Scan(&organization)

	return organization
}

func DeleteOrganization(nelementkey string) {
	db.Exec("DELETE FROM dictionary_structure WHERE nelementkey = ?", nelementkey)
}

func AddOrganization(r *http.Request) (error, Organization) {
	_ = json.NewDecoder(r.Body).Decode(&organization)

	err := OrganizationValidate(organization)

	if err == nil {
		db.Exec("INSERT INTO dictionary_structure (celementname, nparentkey) VALUES (?, ?)",
			organization.Celementname, organization.Nparentkey)

		db.Raw("SELECT last_value as nelementkey FROM dictionary_structure_nelementkey_seq").Scan(&organization)
	}

	return err, organization
}

func UpdateOrganization(r *http.Request) (error, Organization) {
	_ = json.NewDecoder(r.Body).Decode(&organization)

	params := mux.Vars(r)

	err := OrganizationValidate(organization)

	if err == nil {
		db.Exec("UPDATE dictionary_structure SET celementname = ?, nparentkey = ? WHERE nelementkey = ?",
			organization.Celementname, organization.Nparentkey, params["nelementkey"])
	}

	return err, organization
}
