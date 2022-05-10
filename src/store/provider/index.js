//구글 인증관련 내용만 따로 작성한 store 모듈

//파이어베이스 앱 객체 모듈
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

//라우터 사용
import router from "@/router";

export default {
    state : {
        oUser : null, // 사용자 정보를 담을 객체
    },
    mutations : {
        fnSetUser(state, payload) {
            state.oUser = payload;
        },
    },
    getters : {
        //사용자 객체 반환
        fnGetUser(state) {
            return state.oUser;
        },
        //사용자 객체값의 유/무로 로그인 여부 판단
        fnGetAuthStatus(state) {
            return state.oUser != null;
        },
    },
    actions : {
        //이메일 회원가입 처리
        fnRegisterUser({ commit }, payload) {
            //스토에 시간걸림으로 바꿈
            commit("fnSetLoading", true)

            //파이어베이스에 이메일 회원 생성 및 저장
            firebase
            .auth()
            .createUserWithEmailAndPassword(payload.pEmail, payload.pPassword)
            .then((pUserInfo) => {
                commit("fnSetUser", {
                    /*7버전은 fnSetUser.email로 접근할수 있지만
                    9버전은 pUserInfo.user.email을 통해 접근한다.*/
                    email : pUserInfo.user.email
                });
                commit("fnSetLoading", false);//로딩완료
                commit("fnSetErrorMessage", "");//스토어 에러메세지 없음
                router.push("/main");
            })
            .catch((err) => {
                commit("fnSetErrorMessage", err.message);
                commit("fnSetLoading", false);
            });
        },

        //파이어베이스에 이메일 회원 로그인 인증처리 요청
        fnDoLogin({ commit }, payload) {
            commit("fnSetLoading", true);

            firebase
            .auth()
            .signInWithEmailAndPassword(payload.pEmail, payload.pPassword)
            .then((pUserInfo) => {
                commit("fnSetUser", {
                    id : pUserInfo.user.uid,
                    name : pUserInfo.user.displayName,
                    email : pUserInfo.user.email,
                    photoURL : pUserInfo.user.photoURL
                });
                commit("fnSetLoading", false);
                commit("fnSetErrorMessage", "");
                router.push("/main");
            })
            .catch((err) => {
                commit("fnSetErrorMessage", err.message);
                commit("fnSetLoading", false);
            });
        },

        //구글 계정 회원 로그인(팝업)
        fnDoGoogleLogin_Popup({ commit }) {
            commit("fnSetLoading", true);

            //파이어베이스에 구글 회원 로그인 인증처리 요청
            //로그인 제공자 객체 생성
            const oProvider = new firebase.auth.GoogleAuthProvider();
            //오픈계정의 범위(가져오는 값)
            oProvider.addScope("profile");
            oProvider.addScope("email");

            //로그인요청
            firebase
            .auth()
            .signInWithPopup(oProvider)
            .then((pUserInfo) => {
                //로그인에 성공하면 스토어에 계정 정보 저장
                console.log("요청 성공 확인");
                commit("fnSetUser", {
                    id : pUserInfo.user.uid,
                    name : pUserInfo.user.displayName,
                    email : pUserInfo.user.email,
                    photoURL : pUserInfo.user.photoURL
                });
                commit("fnSetLoading", false);
                commit("fnSetErrorMessage", "");
                router.push("/main");
            })
            .catch((err) => {
                commit("fnSetErrorMessage", err.message);
                commit("fnSetLoading", false);
            });
        },

        //로그아웃
        fnDoLogout({ commit }) {
            firebase.auth().signOut();
            commit("fnSetUser", null);
            router.push("/");
        },

        //회원탈퇴
        fnDoDelete({ commit }) {
            //파이아베이스에 회원탈퇴를 요청
            const user = firebase.auth().currentUser;
            user.delete().then(() => {
                //store의 회원정보에 빈값을 넣음
                commit("fnSetUser", null);
                router.push('/');
            }).catch((err) => {
                console.log(err);
            });
        },

        /*자동 로그인 처리(잘 몰?루겠음)
        pUserInfo.user.uid 인지? pUserInfo.uid인지? 근데 왜 이것만?*/
        fnDoLoginAuto({ commit }, pUserInfo) {
            commit("fnsetUser", {
                id : pUserInfo.user.uid,
                name : pUserInfo.user.displayName,
                email : pUserInfo.user.email,
                photo : pUserInfo.user.photoURL
            });
            commit("fnSetLoading", false);
            commit("fnSetErrorMessage", "");
        },
    },
};