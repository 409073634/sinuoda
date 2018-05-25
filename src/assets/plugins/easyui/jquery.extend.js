//jQuery扩展
jQuery.extend({
    "ajaxSyncGet": function (url, data) {
        var ret = $.ajax({
            type: "GET",
            url: url,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var e = JSON.parse(XMLHttpRequest.responseText);
                alert(e.Message, e.StackTrace);
            }
        });
        return JSON.parse(ret.responseText);

    },
    "ajaxSync": function (url, data) {
        var ret = $.ajax({
            type: "POST",
            url: url,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var e = JSON.parse(XMLHttpRequest.responseText);
                alert(e.Message, e.StackTrace);
            }
        });
        return JSON.parse(ret.responseText);
    },
    "ajaxAsync": function (url, data, callBack) {
        var calbacks = $.Callbacks("unique");
        calbacks.add(callBack);
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            beforeSend: function (XMLHttpRequest) {
                loading(true);
            },
            complete: function (XMLHttpRequest, textStatus) {
                loading(false);
                calbacks.fire(JSON.parse(XMLHttpRequest.responseText));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 通常 textStatus 和 errorThrown 之中
                // 只有一个会包含信息
                //this; // 调用本次AJAX请求时传递的options参数
            }
        });
    },
    "ajaxAsyncForm": function (url, data, callBack) {
        var calbacks = $.Callbacks("unique");
        calbacks.add(callBack);
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            async: true,
            cache: false,
            beforeSend: function (XMLHttpRequest) {
                loading(true);
            },
            complete: function (XMLHttpRequest, textStatus) {
                loading(false);
                calbacks.fire(JSON.parse(XMLHttpRequest.responseText));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 通常 textStatus 和 errorThrown 之中
                // 只有一个会包含信息
                //this; // 调用本次AJAX请求时传递的options参数
            }
        });
    },
    //$.QueryString["ppp"]
    //$.addQueryString({"key":"value"});
    'QueryString':
    window.location.search.length <= 1 ?
        new Object() : function (a) {
            var b = new Object();
            for (var i = 0; i < a.length; ++i) {
                var p = a[i].split('=');
                if (p[0] == "_") {
                    continue;
                }
                b[p[0]] = decodeURIComponent(p[1]);
            }
            return b;
        }(window.location.search.substr(1).split('&')),
    'addQueryString': function (keyValues) {
        return this.param(this.extend({}, this.QueryString, keyValues));
    },
    //页面数据变量缓存
    //getVarFun 通常为获取对象的ajax方法
    'CacheVarSetting': function (varName, getVarFun) {
        var f = $(document).data("VarFun");
        if (!f) {
            f = new Object();
        }
        f[varName] = getVarFun;
        $(document).data("VarFun", f);
    },
    'GetCacheVar': function (varName, key1, key2, key3, key4) {
        var dataKey = varName;
        if (key1) {
            dataKey += "|" + key1;
        }
        if (key2) {
            dataKey += "|" + key2;
        }
        if (key3) {
            dataKey += "|" + key3;
        }
        if (key4) {
            dataKey += "|" + key4;
        }
        var v = $(document).data(dataKey);
        if (v) {
            return v;
        }
        else {
            var f = $(document).data("VarFun");
            if (!f) {
                return null;
            }
            if ($.isFunction(f[varName])) {
                return f[varName].call(window, key1, key2, key3, key4);
            }
            else {
                return null;
            }
        }
    },
    //将页面上指定区域的带name属性的控件的值组装成对象
    'serializeObject': function (area) {
        var model = new Object();
        var items = $((area || "") + " input[name],textarea[name],select[name]");
        for (var i = 0; i < items.size(); i++) {
            model[items.eq(i).attr('name')] = items.eq(i).val();
        }
        return model;
        //alert(JSON.stringify(model));

    },
    'getFormJson': function (frm) {
        var o = {};
        var a = $(frm).serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    },
    'setValueFromJson': function (jsonStr) {
        var o = JSON.parse(jsonStr);
        $("body").find("*").each(function () {
            if (o[this.id] != undefined) {
                $(this).html(o[this.id]);
            }
        });
    },
    //将字符串转换成日期格式
    'getStrDate': function (strDate) {
        var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
            function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
        return date;
    },
    //获取指定日期之前几天
    'getBeforeDate': function (d, n) {
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        if (day <= n) {
            if (mon > 1) {
                mon = mon - 1;
            }
            else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
    },
    'getAfterDate': function (d, n) {
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        if (day <= n) {
            if (mon > 1) {
                mon = mon - 1;
            }
            else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() + n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
    }
});
// easyui messager扩展
$.extend($.messager, {
    /** 在屏幕上方中间显示一个提示框 */
    info: function () {
        if (arguments.length < 1) {
            throw "info method need least 1 argument";
        }
        var message = {
            title: null,
            msg: null,
            timeout: 1000,
            closable: false,
            showType: "side",
            style: {
                right: '',
                top: '',//document.body.scrollTop + document.documentElement.scrollTop,
                bottom: '10%'
            }
        };
        if (arguments.length == 1 && typeof (message) === "object") {
            var arg = arguments[0];
            for (var i in message) {
                if (arg.hasOwnProperty(i)) {
                    message[i] = arg[i];
                }
            }
            return $.messager.show(message);
        }
        if (arguments.length > 1) {
            message.title = arguments[0];
            message.msg = arguments[1];
        }
        if (arguments.length > 2) {
            message.timeout = arguments[2];
        }
        if (arguments.length > 3) {
            message.showType = arguments[3];
        }
        return $.messager.show(message);
    }
});
$.extend($.fn.datagrid.methods, {
    /** 获取指定行的数据 从0开始 */
    getIndexRow: function (jq, rowIndex) {
        //获取所有列
        var rows = $(jq).datagrid('getRows');
        if (rowIndex >= rows.length)
            return null;
        return rows[rowIndex];
    },
    /** 编辑单元格 */
    editCell: function (jq, param) {
        return jq.each(function () {
            var dg = this;
            //获取所有列的编辑项的配置
            var opts = $(dg).datagrid('options');
            //把除了指定列之外的列的编辑项置空
            //var fields = $(this).datagrid('getColumnFields', true).concat($(this).datagrid('getColumnFields'));
            var fields = $(dg).datagrid('getColumnFields');
            for (var i = 0; i < fields.length; i++) {
                var col = $(dg).datagrid('getColumnOption', fields[i]);
                col.editor1 = col.editor;
                if (fields[i] != param.field) {
                    col.editor = null;
                }
            }
            //编辑指定行
            $(dg).datagrid('beginEdit', param.index);
            //还原每列的编辑项
            for (var i = 0; i < fields.length; i++) {
                var col = $(dg).datagrid('getColumnOption', fields[i]);
                col.editor = col.editor1;
            }

            var ed = $(dg).datagrid('getEditor', param);//获取当前编辑器
            if (!ed) {
                $(dg).datagrid('endEdit', param.index);
                return;
            }
            var edTarget;
            eval("edTarget = $(ed.target)." + ed.type + "('textbox')");

            if (!edTarget) return
            edTarget.focus()//获取焦点

            //判读鼠标位置 结束编辑
            $("body").off("click.tableEditCheck")
                .on("click.tableEditCheck", function (e) {

                    et = $(e.target);
                    var isSame = et.is("td[field=" + param.field + "] div.datagrid-cell") || et.closest("td[field=" + param.field + "]").length > 0;
                    if (isSame) return;
                    debugger;
                    if (!$(dg).datagrid('validateRow', param.index)) return;
                    $(dg).datagrid('refreshRow', param.index);
                    $(dg).datagrid('endEdit', param.index);

                    $("body").off("click.tableEditCheck");
                });

        });
    },
    /**
     * 展示tooltip提示信息
     * @param option position=出现方向，content=消息内容, index=出现的位置（索引）
     */
    showTip: function (jq, option) {
        if (!option) option = {};
        //var scrollTop = jq.prevAll().find('.datagrid-body').scrollTop();
        //var dfRow = Math.ceil(scrollTop / 30); //是否需要计算并找到滚动之后的第一条
        var row = jq.prevAll().find('.datagrid-row').eq(option.index || 0);
        if (!option.content) {
            option.content = '请选择一行数据';
        }
        row.tooltip('error', option);
    }
});
//自定义验证
$.extend($.fn.validatebox.defaults.rules, {
    idCard: {// 验证身份证
        validator: function (value) {
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
        },
        message: '身份证号码格式不正确'
    },
    minLength: {//validType="minLength[100]"
        validator: function (value, param) {
            return value.length >= param[0];
        },
        message: '请输入至少（2）个字符.'
    },
    length: { //validType="length[0,1000]"
        validator: function (value, param) {
            var len = $.trim(value).length;
            return len >= param[0] && len <= param[1];
        },
        message: "输入内容长度必须介于{0}和{1}之间."
    },
    phone: {// 验证电话号码
        validator: function (value) {
            return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '格式不正确,请使用下面格式:020-88888888'
    },
    mobile: {// 验证手机号码
        validator: function (value) {
            return /^1[3-8]+\d{9}$/i.test(value);
        },
        message: '手机号码格式不正确'
    },
    intOrFloat: {// 验证整数或小数
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '请输入数字，并确保格式正确'
    },
    currency: {// 验证货币
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '货币格式不正确'
    },
    qq: {// 验证QQ,从10000开始
        validator: function (value) {
            return /^[1-9]\d{4,9}$/i.test(value);
        },
        message: 'QQ号码格式不正确'
    },
    integer: {// 验证整数 可正负数
        validator: function (value) {
            //return /^[+]?[1-9]+\d*$/i.test(value);
            return /^([+]?[0-9])|([-]?[0-9])+\d*$/i.test(value);
        },
        message: '请输入整数'
    },
    age: {// 验证年龄
        validator: function (value) {
            return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value);
        },
        message: '年龄必须是0到120之间的整数'
    },
    chinese: {// 验证中文
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value);
        },
        message: '请输入中文'
    },
    english: {// 验证英语
        validator: function (value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message: '请输入英文'
    },
    unnormal: {// 验证是否包含空格和非法字符
        validator: function (value) {
            return /.+/i.test(value);
        },
        message: '输入值不能为空和包含其他非法字符'
    },
    //username: {// 验证用户名
    //    validator: function (value) {
    //        return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
    //    },
    //    message: '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
    //},
    faxno: {// 验证传真
        validator: function (value) {
            return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '传真号码不正确'
    },
    zip: {// 验证邮政编码
        validator: function (value) {
            return /^[1-9]\d{5}$/i.test(value);
        },
        message: '邮政编码格式不正确'
    },
    email: {// 验证邮箱
        validator: function (value) {
            return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/i.test(value);
        },
        message: '邮箱格式不正确'
    },
    ip: {// 验证IP地址
        validator: function (value) {
            return /d+.d+.d+.d+/i.test(value);
        },
        message: 'IP地址格式不正确'
    },
    name: {// 验证姓名，可以是中文或英文
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
        },
        message: '请输入姓名'
    },
    date: {// 验证日期
        validator: function (value) {
            //格式yyyy-MM-dd或yyyy-M-d
            return /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i.test(value);
        },
        message: '清输入合适的日期格式'
    },
    endTime: {
        validator: function (value, param) {
            return value >= $(param[0]).val();
        },
        message: '结束日期不能小于开始日期'
    }
});
$.extend($.fn.tree.methods, {
    /**
     * 递归获取所有父节点
     * @param curNode 指定的结点(如果没有传入curNode，则取当前选中(getSelected)结点)
     */
    getParents: function (jq, curNode) {
        if (!curNode)
            curNode = jq.tree('getSelected');
        var arr = [];
        (function rec() {
            var pNode = jq.tree('getParent', curNode.target);
            if (pNode) {
                arr.push(curNode = pNode);
                rec();
            }
        })();
        return arr;
    },
    /**
     * 展示tooltip提示信息
     * @param option position=出现方向，content=消息内容, index=出现的位置（索引）
     */
    showTip: function (jq, option) {
        if (!option) option = {};
        var node = jq.find('.tree-node .tree-title').eq(option.index || 0);
        if (!option.content) {
            option.content = '请选择一个结点';
        }
        node.tooltip('error', option);
    }
});
$.extend($.fn.tooltip.methods, {
    /**
     * 验证错误时，提供手动提示功能（不适用于 EasyUI 控件）
     * @param option 基础设置参数
     */
    error: function (jq, option) {
        if (!option.onShow) {
            option.onShow = function () {
                var tip = jq.tooltip('tip');
                tip.css({
                    backgroundColor: 'lightyellow'
                }).mouseover(function () {
                    tip.hide();
                    jq.tooltip('hide');
                });
                setTimeout(function () { jq.tooltip('hide') }, 1000);
            }
        }
        if (!option.onHide) {
            option.onHide = function (e) {
                jq.tooltip('destroy');
            }
        }
        jq.tooltip(option).tooltip('show');
    }
});
