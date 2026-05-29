<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: 'Feedback',
        data() {
            return {
                feedback: {
                    name: '',
                    email: '',
                    message: ''
                }
            }
        },
        methods: {
            sendFeedback() {
                this.$http.post('/api/feedback', this.feedback).then(response => {
                    this.feedback = {
                        name: '',
                        email: '',
                        message: ''
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>