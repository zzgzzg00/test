module.exports = function(grunt) {
    grunt.initConfig({
        'create-windows-installer': {
            ia32: {
                appDirectory: './electorntest-win32-ia32',
                outputDirectory: './dist32',
                name: 'electorntest',
                description: 'electorntest',
                authors: 'qunar',
                exe: 'electorntest.exe'
            },
            x64: {
                appDirectory: './electorntest-win32-x64',
                outputDirectory: './dist64',
                name: 'electorntest',
                description: 'electorntest',
                authors: 'qunar',
                exe: 'electorntest.exe'
            }
        }
    });
    grunt.loadNpmTasks('grunt-electron-installer');
};