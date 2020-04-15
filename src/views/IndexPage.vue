<template>
    <div>
        <div>
            <div class="home_bg">
                <img src="https://img.xiaopiu.com/userImages/img398001705b4bef20.jpg" alt="">
                <div class="title1">
                    <p>智能问答系统</p>
                </div>
                <div class="title2">
                    <p>无需机器学习专业知识，全流程可视化便捷操作</p>
                </div>
                <div class="btn1">
                    <button type="button" class="btn btn-primary">登录</button>
                </div>

            </div>
        </div>
        <div class="container home_bar">
            <div class="row">
                <div class="col-4">
                    <div class="ziti1">
                        <p>核心技术</p>
                    </div>
                    <div class="ziti2">
                        <p>拥有丰富的经验积累和专业核心技术，为精准和深度的智能问答提供坚实基础</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="ziti1">
                        <p>应有尽有</p>
                    </div>
                    <div class="ziti2">
                        <p>一站式解决不同场景下的对话模型训练需求，全流程可视化操作，轻松实现智能对话机器学习模型</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="ziti1">
                        <p>行业领先</p>
                    </div>
                    <div class="ziti2">
                        <p>强大的机器学习模型，结合多场景的文本语料，将智能问答的准确度提升到行业领先水平</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexPage"
    }
</script>

<style scoped>
    .home_bg{
        width: 100%;
    }
    .home_bg img {
        width: 100%;
        margin-left: -2px;
        margin-top: -203px;
    }
    .title1 {
        position: absolute;
        top: 200px;
        width: 100%;
    }
    .title1 p {
        font-size: 90px;
        color: rgba(255, 255, 255, 1);
        line-height: 90%;
        text-align: center;
        font-weight: 700;
        font-style: italic;
        top: 50%;
        transform: translateY(-50%);
        transform-origin: 0 center;
    }

    .title2 {
        position: absolute;
        top: 400px;
        width: 100%;
    }
    .title2 p {
        font-size: 20px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
    }
    div .btn1{
        position: absolute;
        top: 500px;
        width: 100%;
        text-align: center;
    }

    div .btn1 button {
        width: 200px;
    }
    .home_bar {
        margin-top: 200px;
    }
    .ziti1 p{
        color: #505050;
        text-align: center;
        word-break: normal;
        line-height: 150%;
        outline: 0;
    }

    .ziti2 p{
        color: #505050;
        font-size: 18px;
        text-align: center;
        word-break: normal;
        line-height: 150%;
        outline: 0;
    }

</style>