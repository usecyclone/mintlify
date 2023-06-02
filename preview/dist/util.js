import Ora from 'ora';
import shell from 'shelljs';
export var buildLogger = function (startText) {
    if (startText === void 0) { startText = ''; }
    var logger = Ora().start(startText);
    return logger;
};
export var getFileExtension = function (filename) {
    var ext = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
    if (filename === ext)
        return undefined;
    return ext;
};
export var ensureYarn = function (logger) {
    var yarnInstalled = shell.which('yarn');
    if (!yarnInstalled) {
        logger.fail("yarn must be installed, run\n\n    npm install --global yarn\n\n    ");
        process.exit(1);
    }
};
