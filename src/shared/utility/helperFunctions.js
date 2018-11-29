export const firebaseDataTrans = firebaseData => {
    const transData = [];

    firebaseData.forEach(childData => {
        transData.push({
            ...childData.val(),
            _id: childData.key
        });
    });
    return transData;
}

export const validateFormElement = (element) => {
  let result = [true, ''];

  if (element.validation.isValidEmail) {
    const valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(element.value);
    const msg = `${!valid ? 'Please enter valid email.' : ''}`;
    result = !valid ? [valid, msg] : result;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const msg = `${!valid ? 'This field is required.' : ''}`;
    result = !valid ? [valid, msg] : result;
  }

  return result;
}

export const bindFormElementValue = (element, formData, value = '') => {
  const newFormData = {...formData};
  const newElement = {...newFormData[element.id]};
  //
  if (value === '') {
    if (newElement.config.type === 'number') {
      const regex = /^[0-9]*$/;
      if(regex.test(element.event.target.value) ) {
        newElement.value = element.event.target.value;
      }
      else {
        newElement.value = '';
      }
    }
    else {
      newElement.value = element.event.target.value;
    }
  }
  else {
    newElement.value = value;
  }
  //
  let result = validateFormElement(newElement);
  newElement.isValid = result[0];
  newElement.validationMsg = result[1];
  //
  newFormData[element.id] = newElement;
  //
  return newFormData;
}

export const immutableArrayReordering = (arr, from, to) => {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}