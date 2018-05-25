const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'electron-build')

  return Promise.resolve({
    appDirectory: path.join(rootPath, 'lapis_energy-win32-x64/'),
    authors: 'Christian Engvall',
    description: 'Application for Lapis Energy',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'lapis_energy.exe',
    setupExe: 'LapisEnergyAppInstaller.exe',
    // setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
  })
}
