/**
 * check if the obj passed in is an object
 * @param {object} obj 
 */
export const isEmptyObject = (obj) =>{
   return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}
