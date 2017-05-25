/*jshint node: true */
'use strict';
const path = require('path');
const fs = require('fs');

module.exports = function (grunt) {
  grunt.registerMultiTask('act-integration', function () {
    const options = this.options({
      metadata: './package.json',
      hostAddress: 'https://rawgit.com/dequelabs/axe-core/master/'
    });
    const metadata = require(path.join(process.cwd(), options.metadata))

    this.files.forEach(file => {
      // collect metadata from package.json
      const output = {
        name: metadata.name,
        description: metadata.description,
        version: metadata.version,
        license: metadata.license,
        contributors: metadata.contributors
      }

      // Fetch all test cases
      output['a11y-testcases'] = file.src.map(source => {
        const jsonPath = path.join(process.cwd(), source)
        // Check that there is a corresponding HTML file
        if (!fs.existsSync(jsonPath.replace('.json', '.html'))) {
          return null
        }

        const testCase = require(jsonPath)
        const rule = require(path.join(process.cwd(), './lib/rules/', testCase.rule + '.json'))
        const criteria = rule.tags.filter(tag => tag.match(/^wcag[0-9]+$/)).map(tag => critMap[tag])

        return {
          url: options.hostAddress + source.replace('.json', '.html'),
          successCriteria: criteria,
          failed: (testCase.violations || []).filter(v => v.length === 1).map(v => v[0]),
          passed: (testCase.passes || []).filter(p => p.length === 1).map(p => p[0])
        }
      }).filter(tc => tc !== null)

      // Save the file
      grunt.file.write(file.dest, JSON.stringify(output, null, '  '))
    })
  })
}

const critMap = {
  wcag111: 'wcag20:text-equiv-all',
  wcag121: 'wcag20:media-equiv-av-only-alt',
  wcag122: 'wcag20:media-equiv-captions',
  wcag123: 'wcag20:media-equiv-audio-desc',
  wcag124: 'wcag20:media-equiv-real-time-captions',
  wcag125: 'wcag20:media-equiv-desc-only',
  wcag126: 'wcag20:media-equiv-sign',
  wcag127: 'wcag20:media-equiv-extended-ad',
  wcag128: 'wcag20:media-equiv-text-doc',
  wcag129: 'wcag20:media-equiv-live-audio-only',
  wcag131: 'wcag20:content-structure-separation-programmatic',
  wcag132: 'wcag20:content-structure-separation-sequence',
  wcag133: 'wcag20:content-structure-separation-understanding',
  wcag141: 'wcag20:visual-audio-contrast-without-color',
  wcag142: 'wcag20:visual-audio-contrast-dis-audio',
  wcag143: 'wcag20:visual-audio-contrast-contrast',
  wcag144: 'wcag20:visual-audio-contrast-scale',
  wcag145: 'wcag20:visual-audio-contrast-text-presentation',
  wcag146: 'wcag20:visual-audio-contrast7',
  wcag147: 'wcag20:visual-audio-contrast-noaudio',
  wcag148: 'wcag20:visual-audio-contrast-visual-presentation',
  wcag149: 'wcag20:visual-audio-contrast-text-images',
  wcag211: 'wcag20:keyboard-operation-keyboard-operable',
  wcag212: 'wcag20:keyboard-operation-trapping',
  wcag213: 'wcag20:keyboard-operation-all-funcs',
  wcag221: 'wcag20:time-limits-required-behaviors',
  wcag222: 'wcag20:time-limits-pause',
  wcag223: 'wcag20:time-limits-no-exceptions',
  wcag224: 'wcag20:time-limits-postponed',
  wcag225: 'wcag20:time-limits-server-timeout',
  wcag231: 'wcag20:seizure-does-not-violate',
  wcag232: 'wcag20:seizure-three-times',
  wcag241: 'wcag20:navigation-mechanisms-skip',
  wcag242: 'wcag20:navigation-mechanisms-title',
  wcag243: 'wcag20:navigation-mechanisms-focus-order',
  wcag244: 'wcag20:navigation-mechanisms-refs',
  wcag245: 'wcag20:navigation-mechanisms-mult-loc',
  wcag246: 'wcag20:navigation-mechanisms-descriptive',
  wcag247: 'wcag20:navigation-mechanisms-focus-visible',
  wcag248: 'wcag20:navigation-mechanisms-location',
  wcag249: 'wcag20:navigation-mechanisms-link',
  wcag2410: 'wcag20:navigation-mechanisms-headings',
  wcag311: 'wcag20:meaning-doc-lang-id',
  wcag312: 'wcag20:meaning-other-lang-id',
  wcag313: 'wcag20:meaning-idioms',
  wcag314: 'wcag20:meaning-located',
  wcag315: 'wcag20:meaning-supplements',
  wcag316: 'wcag20:meaning-pronunciation',
  wcag321: 'wcag20:consistent-behavior-receive-focus',
  wcag322: 'wcag20:consistent-behavior-unpredictable-change',
  wcag323: 'wcag20:consistent-behavior-consistent-locations',
  wcag324: 'wcag20:consistent-behavior-consistent-functionality',
  wcag325: 'wcag20:consistent-behavior-no-extreme-changes-context',
  wcag331: 'wcag20:minimize-error-identified',
  wcag332: 'wcag20:minimize-error-cues',
  wcag333: 'wcag20:minimize-error-suggestions',
  wcag334: 'wcag20:minimize-error-reversible',
  wcag335: 'wcag20:minimize-error-context-help',
  wcag336: 'wcag20:minimize-error-reversible-all',
  wcag411: 'wcag20:ensure-compat-parses',
  wcag412: 'wcag20:ensure-compat-rsv'
}