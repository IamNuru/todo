import { errorBeep2, errorBeep1 } from "./Beeps"

//showing just a normal message
export const normal_message = (message) => {
    return `<span>${message}</span>`;
};


//an error messages
export const error_message = (message) => {
    errorBeep2();
    return `<span class="error_messge_icon small"></span> <span>${message}</span>`;   
};


//success message
export const success_message = (message) => {
    return `<span class="success_messge_icon small"></span> <span>${message}</span>`;
};


//error message with a button
export const error_message_with_button = (type, message) => {
    errorBeep2();
    return `<span class="error_messge_icon small"></span> <span>${message}</span><a class="btn-flat toast-action modal-trigger" href='#${type}_todo_modal'>Retry</a>`;
};


//success message with a button
export const success_message_with_button = (type, message) => {
    return `<span class="success_messge_icon small"></span> <span>${message}</span><a class="btn-flat toast-action modal-trigger" href='#${type}_todo_modal'>Add New</a>`;
};