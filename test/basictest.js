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

const expect = require('chai').expect;
const flatten = require('../');

describe('test of _apply', function() {
    it('should apply ‘$.foo=bar’ on {}', function() {
        const k = '$.foo';
        const v = 'bar';
        const input = { somethingElse: true };
        const output = flatten._apply(input, k, v);
        expect(output).to.deep.equal({somethingElse: true, foo: 'bar'});
    });
});

describe('test of flatten()', function() {
    it('should return {} when passed null', function() {
        const input  = null;
        const output = flatten.flatten(input);
        expect(output).to.deep.equal({});
    });

    it('flatten(input1.json) ≈ flatten1.json', function() {
        const input  = require('./input1.json');
        const output = flatten.flatten(input);
        expect(output).to.deep.equal(require('./flatten1.json'));
    });

    it('flatten(input2.json) ≈ input2.json', function() {
        const input  = require('./input2.json');
        const output = flatten.flatten(input);
        expect(output).to.deep.equal(require('./input2.json'));
    });
    it('flatten(input1.json,{flattenAll:true}) ≈ flatten1x.json', function() {
        const input  = require('./input1.json');
        const output = flatten.flatten(input, {flattenAll: true});
        expect(output).to.deep.equal(require('./flatten1x.json'));
    });
    it('flatten(input2.,{flattenAll:true}) ≈ flatten2x.json', function() {
        const input  = require('./input2.json');
        const output = flatten.flatten(input, {flattenAll: true});
        expect(output).to.deep.equal(require('./flatten2x.json'));
    });

    it('flatten(input3.json) ≈ flatten3.json', function() {
        const input  = require('./input3.json');
        const output = flatten.flatten(input);
        expect(output).to.deep.equal(require('./flatten3.json'));
    });
});

describe('test of expand()', function() {
    it('should return {} when passed null', function() {
        const out = flatten.flatten(null);
        expect(out).to.deep.equal({});
    });

    it('expand(flatten1.json) ≈ expand1.json', function() {
        const input  = require('./flatten1.json');
        const output = flatten.expand(input);
        expect(output).to.deep.equal(require('./expand1.json'));
    });

    it('expand(input2.json) ≈ input2.json', function() {
        const input  = require('./input2.json');
        const output = flatten.expand(input);
        expect(output).to.deep.equal(require('./input2.json'));
    });

    it('expand({"$.$.$":"abc"}) = {"$.$.$":"abc"}', function() {
        const input = {"$.$.$":"abc"};
        const output = flatten.expand(input);
        expect(output).to.deep.equal(input);
    });

    it('expand(flatten3.json) ≈ expand3.json', function() {
        const input  = require('./flatten3.json');
        const output = flatten.expand(input);
        expect(output).to.deep.equal(require('./expand3.json'));
    });
});

