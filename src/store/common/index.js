//에러 및 로딩관련 store 모듈

export default {
    store : {
        bIsLoading : false, // 처리중 시간이 걸림을 표시
        sErrorMessage : ''
    },
    mutations : {
        //처리중에 시간이 걸리는지 여부를 결정
        fnSetLoading(state, payload) {
            state.bIsLoading = payload;
        },
        //처리중 오류메세지를 저장
        fnSetErrorMessage(state, payload) {
            state.sErrorMessage = payload;
        },
    },
    getters : {
        fnGetLoading(state) {
            return state.bIsLoading;
        },
        fnGetErrorMessage(state) {
            return state.sErrorMessage;
        },
    },
    actions : {}
}