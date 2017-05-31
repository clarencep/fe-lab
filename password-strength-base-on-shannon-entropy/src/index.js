import {html} from 'es6-string-html-template'

import './index.less'

function calcShannonEntropy(data)
{
    let dataLen = data.length

    // H(X) = E[I(X)] = E[-ln(P(X))]
    // H(X) = SUM(P(x) * I(x)) = - SUM(P(x) * log(P(x), 2))        (in bits)


    // the count of each byte
    let bytesCount = new Array(256)

    for (let i = 0; i < 256; i++){
        bytesCount[i] = 0
    }

    for (let i = 0; i < dataLen; i++){
        let b = data.charCodeAt(i)
        bytesCount[b]++
    }

    // calc P(x)
    let bytesPossibilities = []
    for (let b = 0; b < 256; b++){
        bytesPossibilities[b] = bytesCount[b] * 1.0 / dataLen
    }

    let h = 0
    for (let px of bytesPossibilities){
        if (px > 0){
            h += px * Math.log2(px)
        }
    }

    return -h * dataLen
}

document.write(html`<div>
    <div>
        <label>Expected Strength: <input type=number id="expected_strength" value="64" />bits</label>
    </div>
    <div>
        <label>Test Password: <input type=password id="passwd" ime-mode="disabled"/></label>
        <div id="actual_strength" ></div>
    </div>
    <div>
        <label>
            <input type=checkbox id=show_password />
            Show Password
        </label>
    </div>
    <div>
        <label>Password Length: <span id="password_length">0</span> bits</label>
    </div>
    <div>
        <label>Shannon Entropy: <span id="shannon_entropy">0</span> bits</label>
    </div>
</div>`)

let $ = document.querySelector.bind(document)

let $expected_strength = $('#expected_strength')
let $passwd = $('#passwd')
let $password_length = $('#password_length')
let $actual_strength = $('#actual_strength')
let $shannon_entropy = $('#shannon_entropy')

let refresh = () => {
    let expected_strength = +$expected_strength.value
    let passwd = $passwd.value + ''

    let shannon_entropy = calcShannonEntropy(passwd)

    let strength = shannon_entropy * 1.0 / expected_strength
    if (strength < 0.6){
        strength = 'weak'
    } else if (strength < 1.0){
        strength = 'middle'
    } else {
        strength = 'strong'
    }

    $actual_strength.className = strength

    $password_length.innerText = passwd.length * 8
    $shannon_entropy.innerText = shannon_entropy.toFixed(3)
}

$expected_strength.addEventListener('input', refresh)
$passwd.addEventListener('input', refresh)

refresh()

$('#show_password').addEventListener('change', e => {
    if (e.currentTarget.checked){
        $passwd.type = 'text'
    } else {
        $passwd.type = 'password'
    }
})
