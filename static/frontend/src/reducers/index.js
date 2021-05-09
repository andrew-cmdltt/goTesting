import { combineReducers } from 'redux';
import users from './users'
import user from './user'
import organizations from "./organizations";
import addOrganizationErrors from "./organizations"
import updateOrganizationErrors from "./organizations"
import organization from "./organization";
import courses from "./courses";
import addCourseErrors from "./courses"
import updateCourseErrors from "./courses"
import course from "./course";
import listeningResult from "./courses";
import tests from "./tests";
import test from "./test";
import addTestErrors from "./tests"
import updateTestErrors from "./tests"
import questions from "./questions";
import question from "./question";
import answers from "./answers";
import auth from "./auth";
import results from "./results";
import appointedTests from "./appointedTests";
import authErrors from './auth'

export default combineReducers({
    users,
    user,
    organizations,
    organization,
    courses,
    course,
    tests,
    test,
    questions,
    question,
    answers,
    auth,
    results,
    appointedTests,
    addCourseErrors,
    updateCourseErrors,
    addOrganizationErrors,
    updateOrganizationErrors,
    addTestErrors,
    updateTestErrors,
    listeningResult,
    authErrors

});
