<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="text-center my-5">
                <h1 class="display-1">로그인페이지</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center" cols="8" offset="2" sm="6">
                <!--양식의 입력이 제출되면 페이지를 새로고침하지 않도록 prevent 사용-->
                <form @submit.prevent="fnDoLogin">
                    <v-text-field name="Email" label="이메일" type="email" v-model="sEmail" required></v-text-field>
                    <v-text-field name="Password" label="비밀번호" type="password" v-model="sPassword" required></v-text-field>
                    <!--시간 지연 상태이면 버튼을 사라지게 함-->
                    <v-btn type="submit" v-if="!fnGetLoading" color="orange" dark>로그인</v-btn>
                    <!--시간 지연 상태이면 회전 프로그레스 원 표시-->
                    <v-progress-circular v-if="fnGetLoading" indeterminate :width="7" :size="70" color="grey lighten-1"></v-progress-circular>
                    <!--오류 메세지가 있을때 표시-->
                    <v-alert class="mt-3" type="error" dismissible v-model="bAlert">{{fnGetErrMsg}}</v-alert>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return{
            bAlert : false,
            sEmail : "",
            sPassword : ""
        }
    },
    computed : {
        fnGetErrMsg(){
            return this.$store.getters.fnGetErrorMessage;
        },
        fnGetLoading(){
            return this.$store.getters.fnGetLoading;
        }
    },
    methods : {
        fnDoLogin() {
            this.$store.dispatch("fnDoLogin", {
                pEmail : this.sEmail,
                pPassword : this.sPassword
            });
        },
    },
    watch : {
        fnGetErrMsg(pMsg) {
            if(pMsg) this.bAlert = true;
        },
        bAlert(pValue) {
            if(pValue == false) this.$store.commit("fnSetErrorMessage", "");
        }
    }
}
</script>