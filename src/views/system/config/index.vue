<template>
  <div class="app-container">
    <!-- 溜井品位设置表单 -->
    <el-form
    :model="wellLevelForm"
      ref="wellLevelForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
    >
        <div>
      <el-form-item
       v-for="(item, index) in wellLevelForm.wellLevelList" :key="index+1"
       :label="'溜井 ' + (index + 1) + '品位'"
       :prop="'wellLevelList.'+index+'.wellLevel'"
       :rules="[{ required: true, message: '请输入溜井品位', trigger: 'blur' },{ type: 'number', message: '必须为数字值'}]"
      >
        <el-input
          :id="'wellLevelList.'+index+'.wellLevel'"
          v-model.number="item.wellLevel"
          placeholder="请输入矿石品位"
          clearable
          style="width: 80px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


    </div>
          <el-button
          type="primary"
          size="mini"
          @click="SetLiujin"
          >
           设置溜井品位
        </el-button>
      </el-form>
<div style="margin-top:30px"></div>
    <!-- 头部表单标签 -->
    <el-form
    :rules="rules"
    :model="queryParamsObject"
      ref="queryParamsObject"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
    >



      <!-- <el-form-item label="参数名称" prop="configName">
        <el-input
          v-model="queryParams.configName"
          placeholder="请输入参数名称"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <div v-for="(item, index) in queryParamsObject.queryParamsList" :key="index">

      <el-form-item :label="'矿石品位'"
      :prop="'queryParamsList.'+index+'.wellLevel'"
      :rules="[{ required: true, message: '请输入矿石品位', trigger: 'blur' },{ type: 'number', message: '必须为数字值'}]"
            >
        <el-input
          v-model.number="item.wellLevel"
          :id="'queryParamsList.'+index+'.wellLevel'"
          placeholder="请输入矿石品位"
          clearable
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="'矿石吨位'"
      :prop="'queryParamsList.'+index+'.wellWeight'"
      :rules="[{ required: true, message: '请输入矿石吨位', trigger: 'blur' },{ type: 'number', message: '必须为数字值'}]"
      >
        <el-input
        :id="'queryParamsList.'+index+'.wellWeight'"
          v-model.number="item.wellWeight"
          placeholder="请输入矿石吨位"
          clearable
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item
      :label="'卸矿点 ' + (index + 1)"
      :prop="'queryParamsList.'+index+'.unLoadWellId'"
      :rules="[{ required: true, message: '请输入矿石吨位', trigger: 'blur' },{ type: 'number', message: '必须为数字值'}]"
      >
        <el-input
          :id="'queryParamsList.'+index+'.unLoadWellId'"
          v-model.number="item.unLoadWellId"
          placeholder="请输入卸矿点"
          clearable
          style="width: 150px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      </div>

        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
        >重置
        </el-button>

        <el-button icon="el-icon-refresh" size="mini" @click="test"
        >测试
        </el-button>

        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="addNewWell"
          >
           添加配矿需求
        </el-button>

        <el-button
          type="primary"
          icon="el-icon-minus"
          size="mini"
          @click="deleteWell"
          >
           删除配矿需求
        </el-button>

        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handlePlan"
        >生成方案</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleOwnPlan"
        >自定义方案</el-button
        >
      </el-form-item>
    </el-form>



    <!-- 渲染矿井列表标签 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:config:add']"
        >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:config:edit']"
        >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:config:remove']"
        >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:config:export']"
        >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-refresh"
          size="mini"
          @click="handleRefreshCache"
          v-hasPermi="['system:config:remove']"
        >刷新缓存</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="configList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="configId" label="序号" align="center" >

      </el-table-column>
      <el-table-column
        label="溜井名称"
        align="center"
        prop="configName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="矿石品位"
        align="center"
        prop="configKey"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="矿石吨位"
        align="center"
        prop="configValue"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="备注"
        align="center"
        prop="configRemark"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click=handleModifyClick(scope.row.configId)
          >修改</el-button
          >
          <el-button size="mini" type="text" icon="el-icon-delete"
          >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="溜井名称" prop="configName">
          <el-input v-model="form.configName" placeholder="请输入溜井名称" />
        </el-form-item>
        <el-form-item label="矿石品位" prop="configKey">
          <el-input v-model="form.configKey" placeholder="请输入矿石品位" />
        </el-form-item>
        <el-form-item label="卸矿点" prop="configKey">
          <el-input v-model="form.configKey" placeholder="请输入矿石品位" />
        </el-form-item>
        <el-form-item label="矿石吨位" prop="configValue">
          <el-input v-model="form.configValue" placeholder="请输入矿石吨位" />
        </el-form-item>
        <el-form-item label="备注" prop="configRemark">
          <el-input
            v-model="form.configRemark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 输入自定义配矿方案对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="OwnPlan"
      width="500px"
      append-to-body
    >
      <el-form ref="ownform" label-width="80px">
        <div v-for="(item, index) in ownform.ownformList" :key="index">
          <el-form-item :label="'溜井名称 ' + (index + 1)" >
            <el-input v-model="item.loadWellId" placeholder="请输入溜井名称" />
          </el-form-item>

          <el-form-item :label="'矿石吨位 ' + (index + 1)">
            <el-input v-model="item.wellWeight" placeholder="请输入矿石吨位" />
          </el-form-item>

          <el-form-item :label="'卸矿点' + (index + 1)">
            <el-input v-model="item.unLoadWellId" placeholder="请输入矿石吨位" />
          </el-form-item>
        </div>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addwell">增加溜井</el-button>
        <el-button type="primary" @click="submitOwnForm">确 定</el-button>
        <el-button @click="cancel2">取 消</el-button>
      </div>

    </el-dialog>

    <!-- 生成方案对话框 -->
    <el-dialog
      :title="title1"
      :visible.sync="plan"
      width="500px"
      append-to-body
    >
      <el-form label-width="80px">
        <el-form-item v-if="planFail" :label="'生成失败'">
          您的重量已超出当前总重量!
        </el-form-item>

        <!-- <el-form-item
          v-for="(item, index) in planForm"
          :key="index"
          :label="'溜井' + item.wellId"
          prop="item"
          :value="item"
        > -->
        <el-form-item>
          生成方案成功
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitPlan">确 定</el-button>
        <el-button @click="cancel1">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改矿石品位对话框 -->
    <el-dialog
      :title="titleModify"
      :visible.sync="modifyPinweiSync"
      width="500px"
      append-to-body
    >
      <el-form label-width="80px">
        <el-form-item
        label="修改品位">
          <el-input v-model.number="wellValueModify" placeholder="请输入要修改的品位值" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitModify(wellValueModify)">确 定</el-button>
        <el-button @click="modifyPinweiSync = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listConfig,
  getConfig,
  delConfig,
  addConfig,
  updateConfig,
  refreshCache,
  getConfigPlan,
  getOwnConfigPlan,
  getTestData,
} from "@/api/system/config";
import axios, { Axios } from "axios";

 export default {
  name: "Config",
  // dicts: ['sys_yes_no'],
  data() {
    return {
    ownform: {
        ownformList: [
          ], // 存储表单数据的数组
      },
      ownformObject:{
        loadWellId: 0,
        unLoadWellId: 0,
        wellWeight: 0
      },
      plan: false,
      planFail: false,
      OwnPlan: false,
      modifyPinweiSync:false,
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 参数表格数据
      configList: [],
      // 弹出层标题
      title: "输入配矿方案",
      title1: "配矿方案",
      titleModify:"修改矿石品位",
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      //表单主数据模型
      queryParamsObject:{
      //查询参数列表
        queryParamsList:[
        {
          unLoadWellId: 0,
          wellLevel: 0,
          wellWeight: 0
        }
        ]
      },
      // 查询参数
      queryParams: {
          unLoadWellId: 0,
          wellLevel: 0,
          wellWeight: 0
      },

      wellLevelForm:{
        wellLevelList:[
        ]
      },

      Liujin:{
            wellId: 0,
            wellLevel: 0
      },
      modifiedId:0,
      wellLists:[],
      // 表单参数
      form: {},
      //方案参数
      planForm: {},
      rules:{},
      wellValueModify:0,
    };
  },
  created() {
    this.getList();
  },

  methods: {
    submitOwnForm() {
      // let data = [];
      // for (let i = 0; i < this.ownform.ownformList.length; i++) {
      //   let item = {};
      //   item.wellId = +this.ownform.ownformList[i].configName;
      //   item.wellWeight = +this.ownform.ownformList[i].configValue;
      //   item.unLoadWellId = +this.ownform.ownformList[i].configValue;
      //   data.push(item)
      // }
      getOwnConfigPlan(this.ownform.ownformList).then((response) => {
        console.log(response);
      });
      this.OwnPlan = false;
      this.$modal.msgSuccess("方案提交成功");
      this.reset();
    },

    addwell() {
      this.ownform.ownformList.push({ ...this.ownformObject }); // 使用对象的拷贝，避免引用相同的表单对象
    },

    /** 查询参数列表 */
    getList() {
      listConfig().then(
        (response) => {
          console.log(response);
          this.configList = response.data.wellLists;
          this.total = response.data.wellLists.length;
          for (let i = 0; i < this.total; i++) {
            this.configList[i].configId = i+1
            this.configList[i].configName = `溜井${i+1}`
            this.configList[i].configKey = this.configList[i].wellLevel;
            this.configList[i].configValue = this.configList[i].wellWeight;
            this.configList[i].configRemark = this.configList[i].wellRemark;

            if(this.wellLevelForm.wellLevelList.length< this.total){
            this.Liujin.wellId = i+1
            this.Liujin.wellLevel = this.configList[i].wellLevel
            this.wellLevelForm.wellLevelList.push({ ...this.Liujin })
            }
          }
          this.total = response.data.wellLists.length;
          this.loading = false;
        }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 取消按钮
    cancel1() {
      this.plan = false;
      this.planFail = false;
      this.reset();
    },
    // 取消按钮
    cancel2() {
      this.OwnPlan = false;
      // this.planFail=false
      this.reset();
    },
    // 表单重置
    reset() {
      this.planForm = {};
      this.ownform.ownformList = [
        {
          // 单个表单的初始数据
          configName: "",
          configKey: "",
          configValue: "",
        },
      ];
      this.form = {
        configId: undefined,
        configName: undefined,
        configKey: undefined,
        configValue: undefined,
        configType: "N",
        remark: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      //this.queryParams.pageNum = 1;
      this.getList();
    },

    // 生成方案按钮操作
    handlePlan() {
      getConfigPlan(this.queryParamsObject.queryParamsList).then((response) => {
        console.log(response);
        if (response.data.error) {
          this.planFail = true;
          this.planForm = {};
        } else {
          this.planForm = Object.values(response.data);
          console.log(this.planForm);
        }
        this.plan = true;
      });
    },


    handleOwnPlan() {
      for (let i = 0; i < this.planForm?.length; i++) {
        let form = {};
        form.configName = this.planForm[i].wellId;
        form.configKey = this.planForm[i].wellLevel;
        form.configValue = this.planForm[i].wellWeight;
        this.ownform.ownformList.push(form);
      }
      this.OwnPlan = true;
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加参数";
    },
    submitPlan() {
      this.plan = false;
      this.planFail = false;
      this.$modal.msgSuccess("方案提交成功");
    },

    submitModify(value){
      updateConfig([{wellId: this.modifiedId,wellLevel: value}]).then(res => {
        alert('设置品位成功')
        this.getList()
        }).catch(err =>{
          alert('设置品位失败')
        })
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.configId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const configId = row.configId || this.ids;
      getConfig(configId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改参数";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.configId != undefined) {
            this.form.configType = "N";
            updateConfig(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.form.configType = "N";
            addConfig(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const configIds = row.configId || this.ids;
      this.$modal
        .confirm('是否确认删除参数编号为"' + configIds + '"的数据项？')
        .then(function () {
          return delConfig(configIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/config/export",
        {
          ...this.queryParams,
        },
        `config_${new Date().getTime()}.xlsx`
      );
    },
    /** 刷新缓存按钮操作 */
    handleRefreshCache() {
      refreshCache().then(() => {
        this.$modal.msgSuccess("刷新成功");
      });
    },

    handleModifyClick(id){
      this.modifiedId = id
      console.log(id)
      this.modifyPinweiSync = true
    },

    // 添加配矿需求操作
    addNewWell(){
      console.log(JSON.stringify({...this.queryParams}))
      this.queryParamsObject.queryParamsList.push({ ...this.queryParams }); // 使用对象的拷贝，避免引用相同的表单对象
      this.queryParams.unLoadWellId = 0;
      this.queryParams.wellLevel = 0;
      this.queryParams.wellWeight = 0;
    },

          //     unLoadWellId: 0,
          // wellLevel: 0,
          // wellWeight: 0
    // 删除配矿需求操作
    deleteWell(){
      this.queryParamsObject.queryParamsList.pop()
    },

    addLiujin(){
      this.Liujin.wellId = this.configList.length+1
      this.Liujin.wellLevel = 0
      this.wellLevelForm.wellLevelList.push({ ...this.Liujin }); // 使用对象的拷贝，避免引用相同的表单对象
    },

    DeleteLiujin(){
      this.wellLevelForm.wellLevelList.pop()
    },
    SetLiujin(){
      console.log(this.wellLevelForm.wellLevelList)
      updateConfig(this.wellLevelForm.wellLevelList).then(res => {
        console.log(res)
        alert('设置品位成功')
        this.getList()
        }).catch(err =>{
          console.log(err)
          alert('设置品位失败')
        })

    },
    test(){
      axios.get("/api/mines/RuningTask").then(res => {
        console.log(res);
      })
    }
  },
};
</script>
