import {CSSTransition} from 'react-transition-group';

export default function Input(props) {
    return (
        <div className={props.classes}>
            <CSSTransition in={props.invalid} mountOnEnter unmountOnExit classNames='fade' timeout={1000}>
                <p>{props.message}</p>
            </CSSTransition>
            <input type='text' placeholder={props.placeholder} value={props.value} onChange={props.onChange} onBlur={props.onBlur} defaultValue={props.defaultValue}/>
        </div>
    );
}