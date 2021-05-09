package models

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

type Course struct {
	Id           int    `json:"id"`
	Organization int    `json:"organization"`
	Name         string `json:"name"`
	Description  string `json:"description"`
}

var courses []Course
var course Course

func GetCourses() []Course {
	db.Raw("SELECT * FROM courses").Scan(&courses)
	return courses
}

func GetCourse(id string) Course {
	db.Raw("SELECT * FROM courses WHERE id = ?", id).Scan(&course)
	return course
}

func DeleteCourse(id string) {
	db.Exec("DELETE FROM courses WHERE id = ?", id)
}

func AddCourse(r *http.Request) (error, Course) {
	_ = json.NewDecoder(r.Body).Decode(&course)

	err := CourseValidate(course)

	if err == nil {
		db.Exec("INSERT INTO courses (organization, name, description) VALUES (?, ?, ?)",
			course.Organization, course.Name, course.Description)

		db.Raw("SELECT last_value as id FROM courses_id_seq").Scan(&course)
	}

	return err, course
}

func UpdateCourse(r *http.Request) (error, Course) {
	_ = json.NewDecoder(r.Body).Decode(&course)

	params := mux.Vars(r)

	err := CourseValidate(course)

	if err == nil {
		db.Exec("UPDATE courses SET organization = ?, name = ?, description = ? WHERE id = ?",
			course.Organization, course.Name, course.Description, params["id"])
	}

	return err, course
}
