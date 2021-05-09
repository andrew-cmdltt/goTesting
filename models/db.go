package models

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
	"os"
)

var db *gorm.DB //база данных
var dbUrl string

func DbConnect(dbUser string, dbPass string) bool {
	e := godotenv.Load() //Загрузить файл .env
	if e != nil {
		fmt.Print(e)
	}

	dbName := os.Getenv("db_name")
	dbHost := os.Getenv("db_host")
	dbPort := os.Getenv("db_port")

	dbUrl = fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s", dbHost,
		dbPort, dbUser, dbName, dbPass) //Создать строку подключения
	fmt.Println(dbUrl)

	conn, err := gorm.Open("postgres", dbUrl)
	if err != nil {
		fmt.Print(err)
		return false
	}

	db = conn
	return true
	//db.Debug().AutoMigrate(&Account{}, &Contact{}) //Миграция базы данных
}

// возвращает дескриптор объекта DB
func GetDB() *gorm.DB {
	return db
}

func GetDBUrl() string {
	return dbUrl
}
