package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"goTesting/controllers"
	"html/template"
	"log"
	"net/http"
	"os"
	"os/exec"
	"time"
)

func main() {
	r := mux.NewRouter()
	http.Handle("/api/", r)
	http.Handle("/static/", http.StripPrefix("/static", http.FileServer(http.Dir("./static/"))))
	http.HandleFunc("/", mainPage)

	// coursers
	r.HandleFunc("/api/courses/", controllers.GetCourses).Methods("GET")
	r.HandleFunc("/api/courses/", controllers.AddCourse).Methods("POST")
	r.HandleFunc("/api/course/{id}/", controllers.GetCourse).Methods("GET")
	r.HandleFunc("/api/course/{id}/", controllers.DeleteCourse).Methods("DELETE")
	r.HandleFunc("/api/course/{id}/", controllers.UpdateCourse).Methods("PUT")

	// organizations
	r.HandleFunc("/api/organizations/", controllers.GetOrganizations).Methods("GET")
	r.HandleFunc("/api/organizations/", controllers.AddOrganization).Methods("POST")
	r.HandleFunc("/api/organization/{nelementkey}/", controllers.GetOrganization).Methods("GET")
	r.HandleFunc("/api/organization/{nelementkey}/", controllers.DeleteOrganization).Methods("DELETE")
	r.HandleFunc("/api/organization/{nelementkey}/", controllers.UpdateOrganization).Methods("PUT")

	// users
	r.HandleFunc("/api/users/", controllers.GetUsers).Methods("GET")
	r.HandleFunc("/api/users/", controllers.AddUser).Methods("POST")
	r.HandleFunc("/api/user/{nuserkey}/", controllers.GetUser).Methods("GET")
	r.HandleFunc("/api/user/{nuserkey}/", controllers.DeleteUser).Methods("DELETE")
	r.HandleFunc("/api/user/{nuserkey}/", controllers.UpdateUser).Methods("PUT")
	r.HandleFunc("/api/auth/login/", controllers.Login).Methods("POST")
	r.HandleFunc("/api/auth/logout/", controllers.Logout).Methods("GET")
	r.HandleFunc("/api/search-users/", controllers.SearchUsers).Methods("POST")

	// tests
	r.HandleFunc("/api/tests/", controllers.GetTests).Methods("GET")
	r.HandleFunc("/api/tests/", controllers.AddTest).Methods("POST")
	r.HandleFunc("/api/test/{nkey}/", controllers.GetTest).Methods("GET")
	r.HandleFunc("/api/test/{nkey}/", controllers.DeleteTest).Methods("DELETE")
	r.HandleFunc("/api/test/{nkey}/", controllers.UpdateTest).Methods("PUT")
	r.HandleFunc("/api/export/{nkey}/", controllers.ExportTest).Methods("GET")
	r.HandleFunc("/api/import/", controllers.ImportTest).Methods("POST")
	r.HandleFunc("/api/search-tests/", controllers.SearchTests).Methods("POST")

	// answers
	r.HandleFunc("/api/answers/", controllers.GetAnswers).Methods("GET")
	r.HandleFunc("/api/answers/{nkey}/", controllers.GetAnswers).Methods("GET")
	r.HandleFunc("/api/answers/", controllers.AddAnswer).Methods("POST")
	r.HandleFunc("/api/search-answers/", controllers.SearchAnswers).Methods("POST")

	// results
	r.HandleFunc("/api/results/", controllers.GetResults).Methods("GET")
	r.HandleFunc("/api/search-results/", controllers.SearchResults).Methods("POST")

	// questions
	r.HandleFunc("/api/questions/{nkey}/", controllers.GetQuestions).Methods("GET")
	r.HandleFunc("/api/questions/", controllers.GetQuestions).Methods("GET")
	r.HandleFunc("/api/questions/", controllers.AddQuestion).Methods("POST")
	r.HandleFunc("/api/question/{nkey}/", controllers.GetQuestion).Methods("GET")
	r.HandleFunc("/api/question/{nkey}/", controllers.DeleteQuestion).Methods("DELETE")
	r.HandleFunc("/api/question/{nkey}/", controllers.UpdateQuestion).Methods("PUT")

	// staffTests
	r.HandleFunc("/api/appointed-tests/", controllers.GetStaffTests).Methods("GET")
	r.HandleFunc("/api/appointed-tests/", controllers.AddStaffTest).Methods("POST")
	r.HandleFunc("/api/appointed-test/{nkey}/", controllers.GetStaffTest).Methods("GET")
	r.HandleFunc("/api/appointed-test/{nkey}/", controllers.DeleteStaffTest).Methods("DELETE")

	// listening
	r.HandleFunc("/api/listening/", controllers.ListenNotify).Methods("GET")

	e := godotenv.Load() //Загрузить файл .env
	if e != nil {
		fmt.Print(e)
	}

	port := os.Getenv("PORT")

	println("Server is started on port:", port)

	openBrowser(fmt.Sprintf("http://localhost%s/", port))

	err := http.ListenAndServe(port, nil)

	if err != nil {
		log.Fatal("ListenAndServe", err)
	}
}

func mainPage(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("static/frontend/templates/frontend/index.html")

	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	if err := tmpl.Execute(w, nil); err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
}

func openBrowser(url string) {
	<-time.After(100 * time.Millisecond)
	err := exec.Command("cmd", "/c", "start", url).Start()
	if err != nil {
		log.Println(err)
	}
}
