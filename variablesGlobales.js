// globalVar.js

let UID_Session = null;

module.exports = {
  getGlobalUid: () => UID_Session,
  setGlobalUid: (uid) => {
    UID_Session = uid;
  },
};
