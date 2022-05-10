<template>
    <v-container flow>
        <v-row>
            <v-col cols="12" class="text-center my-5">
                <h1 class="display-1">회원가입 페이지</h1>
            </v-col>
        </v-row>
        <v-row>
            <!--반응형에 따라 다르게 너비 조절-->
            <v-col class="text-center" cols="8" offset="2" sm="6" offset-sm="3">
            <!--양식의 입력이 제출되면 페이지를 새로고침 않도록 prevent 사용-->
                <form @submit.prevent="fnRegisterUser">
                <!--필수 입력사항이 되도록 required 어트리뷰트 적용-->
                <v-text-field name="Email" label="이메일" type="email" v-model="sEmail" required></v-text-field>
                <v-text-field name="Password" label="비밀번호" type="password" v-model="sPassword" required></v-text-field>
                <!--비밀번호 확인이 맞는지 검사하도록 rules 어트리뷰트 사용(확인하기 위해선 배열로 받아야됨)-->
                <v-text-field name="ConfirmPassword" label="비밀번호 확인" type="password" v-model="sConfirmPassword" required :rules="[fnComparePassword]"></v-text-field>
                <!--시간 지연 상태이면 버튼을 사라지게 함-->
                <v-btn type="submit" v-if="!fnGetLoading" color="orange" dark>회원가입</v-btn>
                <!--시간 지연 상태이면 회전 프로그레스 원 표시-->
                <v-progress-circular v-if="fnGetLoading" indeterminate :width="7" :size="70" color="grey lighten-1"></v-progress-circular>
                <!--오류 메시지가 있을때 표시-->
                <v-alert type="error" dismissible v-model="bAlert">{{gnGetErrMsg}}</v-alert>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return{
            bAlert : false,         //오류메세지 표시여부
            sEmail : "",            //이메일 입력값 임시저장
            sPassword : "",         //비밀번호 입력값 임시저장
            sConfirmPassword : ""   //비밀번호 입력 확인값 임시저장
        }
    },
    computed : {
        fnComparePassword() {
            //비밀번호와 비밀번호 값이 일치하는지 검사
            if(this.sPassword == this.sConfirmPassword) return true;
            else return "비밀번호가 일치하지 않습니다."
        },
        gnGetErrMsg() {
            //오류 메세지 스토어에서 읽어서 반환
            return this.$store.getters.fnGetErrorMessage;
        },
        fnGetLoading() {
            //시간 지연 상태 스토어에서 읽어서 반환
            return this.$store.getters.fnGetLoading;
        }
    },
    methods : {
        //스토어에 이메일 회원가입 처리 요청
        fnRegisterUser() {
            if(this.fnComparePassword == true){
                this.$store.dispatch("fnRegisterUser", {
                    pEmail : this.sEmail,
                    pPassword : this.sPassword
                });
            }
        }
    },
    watch : {
        //fnGetErrMsg() 함수가 오류 메세지를 반환하면 오류 메세지 표시
        fnGetErrMsg(pMsg) {
            if(pMsg) this.bAlert = true;
        },
        //bAlert값이 false가 되면 오류메세지 초기화
        bAlert(pValue) {
            if(pValue == false) this.$store.commit("fnSetErrorMessage", "");
        }
    }
}
</script>