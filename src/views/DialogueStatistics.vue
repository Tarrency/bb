<template>
    <div class="dialoguestatistics">
        <div class="panel">
            <div class="option-panel">
                <el-form :inline="true">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="聊天日期：">
                                <el-date-picker
                                        v-model="value1"
                                        type="date"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>

                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="对话内容：">
                                <el-input v-model="query.uname" placeholder="请输入搜索内容"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="用户：">
                                <el-input v-model="query.uname" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="用户标记：">
                                <el-select placeholder="" v-model="query.gender">
                                    <el-option label="全部" :value="-1"></el-option>
                                    <el-option label="顶" :value="0"></el-option>
                                    <el-option label="踩" :value="1"></el-option>
                                    <el-option label="无标记" :value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="Agent分类：">
                                <el-select placeholder="" v-model="query.state">
                                    <el-option label="全部" :value="-1"></el-option>
                                    <el-option label="电信史" :value="1"></el-option>
                                    <el-option label="党史" :value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" >
                            <el-button type="primary" icon="el-icon-search" style="float:right" @click="search">搜索</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="primary" icon="el-icon-plus" style="float:right" @click="modalState.addUser=true">重置</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="line"></div>

            <el-table :data="users" stripe border height="550" style="width:100%;" v-loading="loading" element-loading-text="正在拼命加载中" :eader-row-style="{'background':'#efefef'}">
                <el-table-column prop="qa" label="问答" align="center"></el-table-column>
                <el-table-column prop="uname" label="用户" width="180" align="center"></el-table-column>
                <el-table-column prop="datetime" label="时间" align="center" :formatter="genderFormatter"></el-table-column>
                <el-table-column prop="content" label="内容" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="()=>{editUser={...scope.row};modalState.editUser=true}">编辑</el-button>
                        <el-button @click="deleteUser(scope.row.id)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination layout="prev, pager, next" :page-count="pageInfo.total" :current-page.sync="pageInfo.current" @current-change="pageChange"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
        },
        data() {
            return {
                users: [],
                query: { uname: '', gender: -1, state: -1 },
                loading: true,
                modalState: {
                    addUser: false,
                    editUser: false
                },
                pageInfo: {
                    total: 1,
                    current: 2,
                    size: 7
                },
            }
        },
        mounted() {
            this.search()
        },
        methods: {
            getUsers(query) {
                this.loading = true;
                console.log(query)
                this.$http.get("/user/list", { params: query }).then(res => {
                    if (res.data.code == 0) {
                        this.users = res.data.data.list
                        this.pageInfo.total = res.data.data.pages
                        this.pageInfo.current = res.data.data.page
                        this.loading = false;
                    }
                }).catch(err => {
                    this.loading = false;
                    console.log(err)
                })
            },
            search() {
                this.query.page = 1
                this.query.size = this.pageInfo.size
                this.getUsers(this.query)
            },
            genderFormatter(row, column) {
                return gender_dict[row.gender]
            },
            deleteUser(id) {
                console.log(id)
                this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete("/user/" + id).then(res => {
                        if (res.data.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.getUsers(this.query)
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败'
                            });
                        }

                    }).catch(err => {
                        this.$message({
                            type: 'error',
                            message: '删除失败'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            updateUser() {
                this.$http.put("/user/" + this.editUser.id, this.editUser).then(res => {
                    if (res.data.code == 0) {
                        this.modalState.editUser = false;
                        this.$message({
                            type: 'success',
                            message: '更新成功'
                        });
                        this.getUsers(this.query)
                    } else {
                        this.$message({
                            type: 'error',
                            message: '更新失败'
                        });
                    }
                }).catch(err => {
                })
            },
            pageChange(page) {
                this.query.page = page
                console.log(this.query.page)
                this.getUsers(this.query);
            }
        }
    }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 100%;
    }
    .panel {
        margin: 0 auto;
        margin-top: 50px;
        width: 1200px;
        height: 750px;
        background-color: #fff;
        padding: 10px;
        padding-top: 20px;
        box-shadow: 0 1px 2px 0 rgba(31, 45, 61, 0.1);
        border-radius: 4px;
        box-sizing: border-box;
        position: relative;
    }
    .pagination {
        margin-top: 50px;
    }
    .option-panel {
        padding: 5px 0;
        box-sizing: border-box;
        width: 100%;
    }
    .line {
        width: 100%;
        border-bottom: 1px solid rgba(31, 45, 61, 0.2);
        position: absolute;
        left: 0;
        /* top: 80px; */
    }
</style>