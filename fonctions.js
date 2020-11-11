'use strict';
/*
 * Convertir un nombre en millisecondes en jours, heures, minutes et secondes
 * @param { Number } ms Le nombre en millisecondes à convertir
 */
function convertMS(ms) {
  let d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return {
    d: d,
    h: h,
    m: m,
    s: s,
  };
}
/*
 * @param { ObjectConstructor } obj L'object
 * @param { String } key La clé de la valeur
 * @param {*} val La valeur de la clé
 * @returns
 */
function getObjects(obj, key, val) {
  let objects = [];
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(getObjects(obj[i], key, val));
    }
    //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
    else if ((i == key && obj[i] == val) || (i == key && val == '')) {
      objects.push(obj);
    } else if (obj[i] == val && key == '') {
      //only add if the object is not already in the array
      if (objects.lastIndexOf(obj) == -1) {
        objects.push(obj);
      }
    }
  }
  return objects;
}
/*
 * Returns an array of values that match on a certain key
 * @param { ObjectConstructor } obj L'objet
 * @param {String} key La clé
 */
function getValues(obj, key) {
  let objects = [];
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(getValues(obj[i], key));
    } else if (i == key) {
      objects.push(obj[i]);
    }
  }
  return objects;
}
/*
 * Returns an array of keys that match on a certain value
 * @param { ObjectConstructor } obj
 * @param {*} val
 */
function getKeys(obj, val) {
  let objects = [];
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(getKeys(obj[i], val));
    } else if (obj[i] == val) {
      objects.push(i);
    }
  }
  return objects;
}

/**
 * Normaliser un string
 * @param {string} string Le string à normaliser
 */
function normalize(string) {
  string = string
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/[^\p{L}A-Za-z ]/gu, '');
  let tochange = string.match(
    /[^\x00-\x7A \x80-\x90 \x93-\x9A \xA0-\xA7 \xE0-\xF0]+/gu
  );
  try {
    tochange.forEach(
      (matched) =>
        (string = string
          .replace(matched, matched.normalize('NFKC'))
          .replace(matched, ''))
    );
  } catch {
    try {
      string = string
        .replace(tochange, tochange.normalize('NFKC'))
        .replace(tochange, '');
    } catch {}
  }

  return string.replace(
    /[^\x00-\x7A \x80-\x90 \x93-\x9A \xA0-\xA7 \xE0-\xF0]/gu,
    ''
  );
}

module.exports = {
  getValues: getValues,
  getKeys: getKeys,
  getObjects: getObjects,
  convertMS: convertMS,
  normalize: normalize,
};
