const path = require("path");
const glob = require("glob");
const { readdirSync } = require("fs");

/**
 * @var String
 * Main root of files.
 */
const ROOT_DIRECTORY = process.cwd();

/**
 * Function to get all names of folder current directory.
 * @param String sourceDirectory
 * @param Array<String>
 */
function hGetDynamicNamesMoules(sourceDirectory = "") {
  return readdirSync(sourceDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

/**
 * Function to change first letter of text to upper case.
 * @param String textToChange
 * @return String
 */
function hToUpperFirstLetter(textToChange = "") {
  return textToChange.charAt(0).toUpperCase() + textToChange.slice(1);
}

/**
 * Function to set dynamical entries for modules.
 * @param Object
 */
function hCreateDynamicEntriesModules() {
  const entriesModules = {};
  hGetDynamicNamesMoules(
    path.resolve(ROOT_DIRECTORY, "generator/src/modules/")
  ).forEach((entry) => {
    entriesModules[hToUpperFirstLetter(entry)] = path.resolve(
      ROOT_DIRECTORY,
      `generator/src/modules/${entry}/index.js`
    );
  });
  return entriesModules;
}

/**
 * Function to get all test files.
 * @return Array
 */
function hGetTestFiles() {
  return glob
    .sync("generator/tests/*.test.js")
    .filter(function (element) {
      return element != "generator/tests/bundle.test.js";
    })
    .map(function (element) {
      return `./${element}`;
    });
}

module.exports = {
  ROOT_DIRECTORY,
  hCreateDynamicEntriesModules,
  hGetTestFiles,
};
