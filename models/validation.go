package models

import (
	validation "github.com/go-ozzo/ozzo-validation"
	"regexp"
	"strconv"
)

type ErrorMessages struct {
	Required                       string
	MustBeString                   string
	MustBeInteger                  string
	OrganizationNotFound           string
	MustBeRangeFrom5To255          string
	MustBeRangeFrom5To250          string
	OrganizationNparentkeyNotFound string
}

type Patterns struct {
	SimpleStringPattern string
}

var patterns = Patterns{
	SimpleStringPattern: `^[-!?"';:,.«»()≡ а-яА-Яa-zA-Z0-9]*$`,
}

var errorMessages = ErrorMessages{
	Required:                       "Заполните это поле!",
	MustBeString:                   "Введите корректные данные!",
	MustBeInteger:                  "Введите числовое значение!",
	OrganizationNotFound:           "Данная организация не найдена!",
	OrganizationNparentkeyNotFound: "Такого типа организации не существует!",
	MustBeRangeFrom5To255:          "Длина не можеть быть меньше 5 и превышать 255!",
	MustBeRangeFrom5To250:          "Длина не можеть быть меньше 5 и превышать 250!",
}

func CourseValidate(course Course) error {
	organization := GetOrganization(strconv.Itoa(course.Organization))

	err := validation.ValidateStruct(
		&course,
		validation.Field(&course.Organization,
			validation.Required.Error(errorMessages.Required),
			validation.In(organization.Nelementkey).Error(errorMessages.OrganizationNotFound),
		),
		validation.Field(&course.Name,
			validation.Required.Error(errorMessages.Required),
			validation.Match(regexp.MustCompile(patterns.SimpleStringPattern)).Error(errorMessages.MustBeString),
			validation.Length(5, 260).Error(errorMessages.MustBeRangeFrom5To255),
		),
		validation.Field(&course.Description,
			validation.Required.Error(errorMessages.Required),
			validation.Match(regexp.MustCompile(patterns.SimpleStringPattern)).Error(errorMessages.MustBeString),
			validation.Length(5, 255).Error(errorMessages.MustBeRangeFrom5To255),
		))

	return err
}

func OrganizationValidate(organization Organization) error {
	err := validation.ValidateStruct(
		&organization,
		validation.Field(&organization.Celementname,
			validation.Required.Error(errorMessages.Required),
			validation.Match(regexp.MustCompile(patterns.SimpleStringPattern)).Error(errorMessages.MustBeString),
			validation.Length(5, 250).Error(errorMessages.MustBeRangeFrom5To250),
		),
		validation.Field(&organization.Nparentkey,
			validation.Required.Error(errorMessages.Required),
			validation.In(300, 310).Error(errorMessages.OrganizationNparentkeyNotFound),
		))

	return err
}

func TestValidate(test Test) error {
	err := validation.ValidateStruct(
		&test,
		validation.Field(&test.Ctestname,
			validation.Required.Error(errorMessages.Required),
			validation.Match(regexp.MustCompile(patterns.SimpleStringPattern)).Error(errorMessages.MustBeString),
			validation.Length(5, 250).Error(errorMessages.MustBeRangeFrom5To250),
		),
		validation.Field(&test.Cmessage,
			validation.Required.Error(errorMessages.Required),
			validation.Match(regexp.MustCompile(patterns.SimpleStringPattern)).Error(errorMessages.MustBeString),
			validation.Length(5, 250).Error(errorMessages.MustBeRangeFrom5To250),
		),
		validation.Field(&test.Nmin1,
			validation.Min(-100),
			validation.Max(test.Nmax1),
		),
		)

	return err
}

