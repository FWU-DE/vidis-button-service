const defaultVbtnAttributes = () => {
  return {
    size: "L",
    dark: false,
    loginurl: "",
    cookie: false,
    idphintname: "kc_idp_hint",
    opentab: true,
    idpdatafile: "idps",
    idp: "",
    requestmethod: "GET",
  };
};
const state = defaultVbtnAttributes();

const getters = {
  size: (state: any) => state.size,
  dark: (state: any) => state.dark,
  loginurl: (state: any) => state.loginurl,
  cookie: (state: any) => state.cookie,
  idphintname: (state: any) => state.idphintname,
  opentab: (state: any) => state.opentab,
  idpdatafile: (state: any) => state.idpdatafile,
  idp: (state: any) => state.idp,
  requestmethod: (state: any) => state.requestmethod,
};

const mutations = {
  update_size: (state: any, size: string) => {
    if (size !== "L" && size !== "M" && size !== "S") size = "L";
    state.size = size;
  },
  update_dark: (state: any, dark: string) => (state.dark = dark),
  update_loginurl: (state: any, loginurl: string) =>
    (state.loginurl = loginurl),
  update_cookie: (state: any, cookie: string) => {
    state.cookie = cookie;
  },
  update_idphintname: (state: any, idphintname: string) =>
    (state.idphintname = idphintname),
  update_opentab: (state: any, opentab: string) => (state.opentab = opentab),
  update_idpdatafile: (state: any, idpdatafile: string) =>
    (state.idpdatafile = idpdatafile),
  update_idp: (state: any, idp: string) => (state.idp = idp),
  update_requestmethod: (state: any, requestmethod: string) =>
    (state.requestmethod = requestmethod),
};

export default {
  state,
  getters,
  mutations,
  defaultVbtnAttributes,
};
