import {useState} from 'react';

export default function useInput(data, includedType, inputType, text) {
    const [input, setInput] = useState(text || '');
    const [touched, setTouched] = useState(false);

    let included;
    if (includedType === 'name') {
        included = !data.includes(input);
    } else if (includedType === 'special') {
        included = !data.includes(input) || input === text;
    } else {
        included = true;
    }

    let message = '';
    const valid = input.length > 0 && included;
    const invalid = !valid && touched;
    const inputClasses = invalid ? 'invalid' : '';

    if (invalid) {
        message = input.length === 0 ? "Length must be more than zero" : `${inputType} already exists.`;
    }

    const handleChange = e => setInput(e.target.value);
    const handleBlur = () => setTouched(true);
    const handleSubmit = () => setTouched(valid ? false : true);

    return [input, valid, inputClasses, handleChange, handleBlur, handleSubmit, invalid, message];
}