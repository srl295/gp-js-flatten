/*	
 * Copyright IBM Corp. 2015,2017
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// test integration with gp
const process = require('process');
const optional = require('optional');
const expect = require('chai').expect;
const flatten = require('../');
const gp = require('g11n-pipeline');
const promtie = require('promtie');

const gpCreds = optional('./local-credentials.json');

var gpClient;

if ( !gpCreds ) { describe = describe.skip; }

describe('test of g11n-pipeline integration', function() {
    it('should setup the gp client', 
        () => { gpClient = gp.getClient(gpCreds)})
    it('should ping the gp server (sanity)', 
        (done) => gpClient.ping(done));
    it('should be able to create a bundle',
        (done) => gpClient
                .bundle('mytest')
                .create({
                    sourceLanguage: 'en',
                    targetLanguages: ['qru']
                }, done));
    it('should be able to upload flattened data',
        (done) => gpClient
                .bundle('mytest')
                .uploadStrings({
                    languageId: 'en',
                    strings: flatten.flatten(require('./input1.json'))
                }, done));
    it('should be able to fetch flattened data',
        (done) => gpClient
                .bundle('mytest')
                .getStrings({
                    languageId: 'en',
                }, (err, result) => {
                    if(err) return done(err);
                    expect(result.resourceStrings).to.deep.equal(require('./flatten1.json'));
                    expect(flatten.expand(result.resourceStrings)).to.deep.equal(require('./expand1.json'));
                    return done();
                }));
    it('should wait a sec for translation',
        (done) => setTimeout(done, 3000, null));
    it('should be able to fetch translated data',
        (done) => gpClient
                .bundle('mytest')
                .getStrings({
                    languageId: 'qru',
                }, (err, result) => {
                    if(err) return done(err);
                    expect(result.resourceStrings).to.deep.equal(require('./flatten1r.json'));
                    expect(flatten.expand(result.resourceStrings)).to.deep.equal(require('./expand1r.json'));
                    return done();
                }));
});