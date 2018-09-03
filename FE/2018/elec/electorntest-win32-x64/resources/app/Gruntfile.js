module.exports = function(grunt) {
    grunt.initConfig({
        'create-windows-installer': {
            ia32: {
                appDirectory: './electorntest-win32-ia32',
                outputDirectory: './dist',
                name: 'electorntest',
                description: 'electorntest',
                authors: 'qunar',
                exe: 'electorntest32.exe'
            },
            x64: {
                appDirectory: './electorntest-win32-x64',
                outputDirectory: './dist',
                name: 'electorntest',
                description: 'electorntest',
                authors: 'qunar',
                exe: 'electorntest64.exe'
            }
        }
    });
    grunt.loadNpmTasks('grunt-electron-installer');
};