<%--
  Created by IntelliJ IDEA.
  User: zhangyan
  Date: 17-2-28
  Time: 下午4:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="com.qunar.common.admin.constant.WebConstants" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>火车票统计（for 携程）</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    <% final String PATH = WebConstants.PATH; %>
    <c:set var="PATH" value="<%=PATH%>"/>
    <link type="text/css" rel="stylesheet"
          href="http://qunarzz.com/train_tts/prd/styles/admin/common@<jsp:include page="/ver/styles/admin/common.css.ver"  flush="true"/>.css"/>
    <link type="text/css" rel="stylesheet"
          href="http://qunarzz.com/train_tts/prd/styles/admin/ui_admin@<jsp:include page="/ver/styles/admin/ui_admin.css.ver" flush="true"/>.css"/>
    <link type="text/css" rel="stylesheet"
          href="http://qunarzz.com/train_tts/prd/styles/admin/qdatepicker@<jsp:include page="/ver/styles/admin/qdatepicker.css.ver" flush="true"/>.css"/>
    <link type="text/css" rel="stylesheet" href="/resources/css/jquery-ui-1.8.13.custom.css"/>
    <style type="text/css">
        html {
            overflow-x: hidden;
        }
        .content {
            float: none;
            clear: both;
            width: 100%;
            margin: 5px 0;
            background: none;
        }
        .content .gray_box {
            background: #e7f5fe;
            border-top: #cae4f7 1px solid;
            border-bottom: #cae4f7 1px solid;
        }
        .order_list .gay_bg {
            background: #ecf7fe;
        }
        .title h3 {
            border: #cae4f7 1px solid;
            border-top: 0px;
            color: #077AC7;
        }
        .content .white_box {
            border: #cae4f7 1px solid;
        }
        .order_list {
            border: #cae4f7 1px solid;
        }
        .order_list td {
            border-top: #cae4f7 1px solid;
            border-bottom: #cae4f7 1px solid;
        }
        .order_list .c1 {
            width: 185px;
            text-align: center;
        }
        .order_list .c2 {
            width: 80px;
        }
        .order_list .c3 {
            width: 95px;
        }
        .order_list .c4 {
            width: 64px;
        }
        .order_list .c5 {
            width: 102px;
        }
        .order_list .c6 {
            width: 110px;
        }
        .oderAdmin {
            margin: 18px 32px 0;
        }
        .order_listbox {
            width: 100%;
            overflow: hidden;
            position: relative;
        }
        .order_list_left {
            width: 226px;
            float: left;
            position: relative;
            _width: 18%;
        }
        .order_list_right {
            margin-left: 226px;
            overflow: hidden;
            border-right: 1px solid #cae4f7;
            position: relative;
            _width: 81%;
        }
        .sollor_line {
            height: 8px;
            background: #e5e5e5;
            margin-left: 226px;
            position: relative;
        }
        .sollor_controller {
            width: 100px;
            height: 8px;
            background: #1778e5;
            overflow: hidden;
            cursor: pointer;
            position: absolute;
            left: 0;
            top: 0
        }
        .order_title {
            position: absolute;
            left: 0px;
            top: 0px;
            border-bottom: 0px;
            height: 65px;
        }
        .order_listbox .js_title {
            width: 100%;
        }
        .order_list_left .js_con td {
            width: auto;
        }
        .order_list_right .order_title table {
            border-bottom: none;
        }
        .fix {
            *zoom:1;
        }
        .fix:after {
            display: block;
            content: "clear";
            height: 0;
            clear: both;
            overflow: hidden;
            visibility: hidden;
        }
        ul.search_box {
            padding: 10px;
        }
        ul.search_box li {
            float: left;
            height: 30px;
            line-height: 30px;
            white-space: nowrap;
            text-align: left;
            margin-right: 30px;
            margin-bottom: 5px;
        }
        .hide {
            display: none;
        }
    </style>
</head>
<body>
<div class="content">
    <div class="gray_box">
        <div class="title">
            <h3>火车票收入统计</h3>
        </div>
        <div class="white_box">
            <form method="post" id="orderForm" action="${PATH}stat/productProfitStatForCtrip.htm">
                <ul class="search_box fix oderAdmin ">
                    <li><span>开始日期：</span>
                        <input id="startTime" name="startTime" type="text"
                               class="textInputN" value="${param.startTime}"/>
                    </li>
                    <li><span>结束日期：</span>
                        <input id="endTime" name="endTime" type="text"
                               class="textInputN" value="${param.endTime}"/>
                    </li>
                    <li><span>订单渠道：</span>
                        <select id="channelType" name="channelType">
                            <c:if test="${channelType!=null}">
                                <option value="${channelType}">${channelTypeDesc}</option>
                            </c:if>

                            <c:forEach items="${channelTypeMap}" var="ys">
                                <option value="${ys.key}">${ys.value}</option>
                            </c:forEach>
                        </select>
                    </li>
                    <li><span>业务类型：</span>
                        <select id="bizType" name="bizType">
                            <c:if test="${bizType!=null}">
                                <option value="${bizType}">${bizTypeDesc}</option>
                            </c:if>

                            <c:forEach items="${bizTypeMap}" var="ys">
                                <option value="${ys.key}">${ys.value}</option>
                            </c:forEach>
                        </select>
                    </li>
                    <li><span>统计版本：</span>
                        <select id="versionType" name="versionType">
                            <option value="0" <c:if test="${versionType == 0}">selected</c:if>>旧版</option>
                            <option value="1" <c:if test="${versionType == 1}">selected</c:if>>新版</option>
                        </select>
                    </li>


                    <li>
                        <button type="button" id="submitButton"><em><em>搜索</em></em></button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
    <div class="gray_box mt10 js_listbox">
        <!--滚动条-->
        <div class="sollor_line js_sollor_line" style="margin-left: 0;">
            <div class="sollor_box">
                <div class="sollor_controller js_sollor_controller">
                </div>
            </div>
        </div>
        <!--滚动条-->
        <div class="order_listbox js_order_listbox">
            <div class="order_list_left js_list_left">
                <div class="order_title js_title">
                    <table border="0" cellspacing="0" cellpadding="0" class="order_list" width="100%" id="tb_title" style="border-right: none; border-bottom:none;">
                    </table>
                </div>
                <div class="orderbox_list js_con" id="tb1">
                    <table border="0" cellspacing="0" cellpadding="0" class="order_list" width="100%" style="border-right: none; border-bottom:none;">
                        <tbody>
                        <c:if test="${empty result && back == 0}">
                            <tr>
                                <td></td>
                            </tr>
                        </c:if>
                        <c:forEach items="${result}" var="entry">
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="order_list_right js_list_right" style="margin-left: 0;">
                <div class="js_order_con"  id="tb">
                    <div class="order_title js_title">
                        <table border="0" cellspacing="0" cellpadding="0" class="order_list js_list_title"
                               style="border-left:none; border-bottom:none;">
                            <tbody>
                            <tr role="head" height="65">
                                <th class="c2" sort="true">日期</th>
                                <th class="c2" sort="true">渠道</th>
                                <th class="c2" sort="true">业务类型</th>
                                <th class="c2" sort="true">提交订单</th>
                                <th class="c3" sort="true">支付订单</th>
                                <th class="c3" sort="true">支付率</th>
                                <th class="c4" sort="true">出票订单</th>
                                <th class="c5" sort="true">出票量</th>
                                <th class="c5" sort="true">票/订单</th>
                                <th class="c5" sort="true">出票率</th>
                                <th class="c4" sort="true">退票量</th>
                                <th class="c5" sort="true">退票率</th>
                                <th class="c5" sort="true">净出票量</th>
                                <th class="c2" sort="true">保险支付订单</th>
                                <th class="c2" sort="true">投保率</th>
                                <th class="c2" sort="true">赠险发放量</th>
                                <th class="c2" sort="true">赠险发放成功量</th>
                                <th class="c5" sort="true">总出保</th>
                                <th class="c2" sort="true">总退保</th>
                                <th class="c2" sort="true">套餐发放量</th>
                                <th class="c2" sort="true">套餐退款量</th>
                                <th class="c2" sort="true">保险搭售率</th>
                                <th class="c2" sort="true">旅游险出保</th>
                                <th class="c6" sort="true">旅游险退保</th>
                                <th class="c6" sort="true">旅游险搭售率</th>
                                <th class="c6" sort="true">旅游险收入</th>
                                <th class="c6" sort="true">意外险收入</th>
                                <th class="c6" sort="true">套餐收入</th>
                                <th class="c6" sort="true">出票服务总收入</th>
                                <th class="c6" sort="true">竞价收入</th>
                                <th class="c6" sort="true">快递费收入</th>
                                <th class="c6" sort="true">单票保险收入</th>
                                <th class="c6" sort="true">单票总收入</th>
                                <th class="c6" sort="true">单保收益</th>
                                <th class="c6" sort="true">总收入</th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="orderbox_list js_con">
                        <table border="0" cellspacing="0" cellpadding="0" id="tb" class="order_list "
                               style="border-left:none">
                            <tbody>
                            <tr role="head" height="65">
                                <th class="c2" sort="true">日期</th>
                                <th class="c2" sort="true">渠道</th>
                                <th class="c2" sort="true">业务类型</th>
                                <th class="c2" sort="true">提交订单</th>
                                <th class="c3" sort="true">支付订单</th>
                                <th class="c3" sort="true">支付率</th>
                                <th class="c4" sort="true">出票订单</th>
                                <th class="c5" sort="true">出票量</th>
                                <th class="c5" sort="true">票/订单</th>
                                <th class="c5" sort="true">出票率</th>
                                <th class="c4" sort="true">退票量</th>
                                <th class="c5" sort="true">退票率</th>
                                <th class="c5" sort="true">净出票量</th>
                                <th class="c2" sort="true">保险支付订单</th>
                                <th class="c2" sort="true">投保率</th>
                                <th class="c2" sort="true">赠险发放量</th>
                                <th class="c2" sort="true">赠险发放成功量</th>
                                <th class="c5" sort="true">总出保</th>
                                <th class="c2" sort="true">总退保</th>
                                <th class="c2" sort="true">套餐发放量</th>
                                <th class="c2" sort="true">套餐退款量</th>
                                <th class="c2" sort="true">保险搭售率</th>
                                <th class="c2" sort="true">旅游险出保</th>
                                <th class="c6" sort="true">旅游险退保</th>
                                <th class="c6" sort="true">旅游险搭售率</th>
                                <th class="c6" sort="true">旅游险收入</th>
                                <th class="c6" sort="true">意外险收入</th>
                                <th class="c6" sort="true">套餐收入</th>
                                <th class="c6" sort="true">出票服务总收入</th>
                                <th class="c6" sort="true">竞价收入</th>
                                <th class="c6" sort="true">快递费收入</th>
                                <th class="c6" sort="true">单票保险收入</th>
                                <th class="c6" sort="true">单票总收入</th>
                                <th class="c6" sort="true">单保收益</th>
                                <th class="c6" sort="true">总收入</th>
                            </tr>
                            <c:if test="${not empty errorMsg && ret eq false}">
                                <tr>
                                    <td class="hide"></td>
                                    <td colspan="20"> ${errorMsg} </td>
                                </tr>
                            </c:if>
                            <c:forEach items="${result}" var="entry">
                                <tr class="gay_bg">
                                    <td class="c2">${entry.statDate}</td><!--日期-->
                                    <td class="c2">${entry.channelType}</td><!--渠道-->
                                    <td class="c2">${entry.bizType}</td><!--业务类型-->
                                    <td class="c2">${entry.submitOrderNum}</td><!--提交订单 a-->
                                    <td class="c3">${entry.payOrderNum}</td><!--支付订单 b-->
                                    <td class="c3">${entry.payRate}</td><!--支付率 b/a-->
                                    <td class="c4">${entry.ticketOutOrderNum}</td><!--出票订单 c-->
                                    <td class="c4">${entry.ticketOutNum}</td><!--出票量 d-->
                                    <td class="c4">${entry.ticketOrderRate}</td><!--票/订单 d/c-->
                                    <td class="c4">${entry.ticketOutRate}</td><!--出票率 d/b-->
                                    <td class="c4">${entry.refundTicketNum}</td><!--退票量 e-->
                                    <td class="c4">${entry.refundTicketRate}</td><!--退票率 e/d-->
                                    <td class="c4">${entry.reallyTicketOut}</td><!--净出票量 d-e-->
                                    <td class="c4">${entry.insurancePayOrderNum}</td><!--保险支付订单 f-->
                                    <td class="c4">${entry.insuredRate}</td><!--投保率 f-->
                                    <td class="c4">${entry.giftInsuranceSendNum}</td><!--赠险发放量 f-->
                                    <td class="c4">${entry.giftInsuranceSendSuc}</td><!--赠险发放成功量 f-->
                                    <td class="c4">${entry.outInsuranceNum}</td><!--总出保 f-->
                                    <td class="c2">${entry.surrenderInsuranceNum}</td><!--总退保 g-->
                                    <td class="c4">${entry.packageDeliverNum}</td><!--套餐发放量 f-->
                                    <td class="c2">${entry.packageRefundNum}</td><!--套餐退款量 g-->
                                    <td class="c2">${entry.insuranceSellRate}</td><!--保险搭售率 (f-g)/(d-e)-->
                                    <td class="c5">${entry.outTravelInsuranceNum}</td><!--旅游险出保 h-->
                                    <td class="c5">${entry.surrenderTravelInsuranceNum}</td><!--旅游险退保 i-->
                                    <td class="c5">${entry.travelInsuranceSellRate}</td><!--旅游险搭售率 (h-i)/(d-e)-->
                                    <td class="c5">${entry.travelInsuranceProfit}</td><!--旅游险收入 R1-->
                                    <td class="c5">${entry.insuranceProfit}</td><!--意外险收入 R2-->
                                    <td class="c5">${entry.packageProfit}</td><!--套餐收入 R6 -->
                                    <td class="c5">${entry.ticketOutServiceProfit}</td><!--出票服务总收入 R2 + R6-->
                                    <td class="c5">${entry.insuranceBidingProfit}</td><!--竞价收入 R3-->
                                    <td class="c5">${entry.expressProfit}</td><!--快递费收入 R5-->
                                    <td class="c5">${entry.singleTicketInsuranceProfit}</td><!--单票保险收入 (R1+R2+R3)/(d-e)-->
                                    <td class="c5">${entry.singleTicketProfit}</td><!--单票总收入 R/(d-e)-->
                                    <td class="c5">${entry.singleInsuranceProfit}</td><!--单保收入 R2/(f-g)-->
                                    <td class="c5">${entry.totalProfit}</td><!--总收入 R=R1+R2+R3+R4+R5+R6-->
                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script charset="UTF-8" type="text/javascript" src="http://qunarzz.com/js/jquery/build/jquery-1.5.2.min.js"></script>
<script charset="UTF-8" type="text/javascript" src="/resources/js/plugins/jquery-ui.js"></script>
<script charset="UTF-8" type="text/javascript" src="/resources/js/plugins/jquery.sorttable.js"></script>
<script type="text/javascript">
    $(function () {
        $("#startTime").datepicker({ dateFormat:'yy-mm-dd' });
        $("#endTime").datepicker({ dateFormat:'yy-mm-dd' });
        $("#tb").sorttable();
        $("#submitButton").click(function () {
            if (check()) {
                $("#submitButton").attr("disabled", true);
                $("#orderForm").submit();
            }
        });
        $("#excel").click(function () {
            if (check()) {
                $("#excel").attr("onclick","return false;");
                $("#start_hidden").val($("#startTime").val());
                $("#end_hidden").val($("#endTime").val());
                $("#orderSource_hidden").val($("#orderSource").val());
                $("#orderTripType_hidden").val($("#orderTripType").val());
                $("#appointmentType_hidden").val($("#appointmentType").val());
                $("#excelForm").submit();
            }
        });
        if (!String.prototype.trim){
            String.prototype.trim = function () {
                return this.replace(/^\s+|\s+$/g, '')
            };
        }

        var parseDate = function (x) { //# zlp: 返回 null 则表明格式错误
            x = x.trim();
            if (x = x.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))
                return new Date(x[1], x[2] - 1, x[3]);
            if (/^\d{8,14}$/.test(x))
                return new Date(x.slice(0, 4), x.slice(4, 6) - 1, x.slice(6, 8));
            return null;
        }

        function check() {
            var end = parseDate($('#endTime').val()), start = parseDate($('#startTime').val());
            if (start && end && end - start.setMonth(start.getMonth() + 1) > 0) {
                alert('搜索时长不能超过一个月');
                return false;
            } else {
                return true;
            }
        }

        //滚动条
        var oLine = $('.sollor_controller');
        var oLineBox = $('.js_sollor_line');
        var oBox = $('.js_list_right');
        var oCon = $('.js_order_con');
        var oCon_title = $('.js_list_right .js_title');
        var oWidth = 0,iMaxLeft = 0, ow = 0,oLineW = 0;

        var init = (function(){
            oWidth = $('.js_order_con table').width();
            oLineW = oLineBox.width() / oCon.width()
            if(oLineW<20){
                oLineW = 20;
            }
            oLine.width(oLineW);
            oCon.width(oWidth);
            oCon_title.width(oWidth);
            iMaxLeft = oLineBox.width() - oLine.width();
            ow = oCon.width();
            oLineBox.bind('mousewheel DOMMouseScroll', scrollFn);
            oCon.bind('mousewheel DOMMouseScroll', scrollFn);
        })();

        oLine.bind('mousedown', function (e) {
            var disY = e.pageX - oLine.position().left;
            document.title = oLine.position().left;
            $(document).bind('mousemove', function (e) {
                var T = e.pageX - disY;
                resize(T);
            });
            $(document).bind('mouseup', function () {
                $(document).unbind();
            })
            return false;
        });

        function resize(offsetX) {
            if (offsetX < 0) {
                offsetX = 0;
            } else if (offsetX > iMaxLeft) {
                offsetX = iMaxLeft;
            }
            var iScale = offsetX / iMaxLeft;
            oLine.css('left', offsetX);
            oCon.css('marginLeft', (oLineBox.width() - ow) * iScale);
            oCon.find('.js_title').css('left', (oLineBox.width() - ow) * iScale);
        }

        function scrollFn(event) {
            var down = event.originalEvent.wheelDelta < 0 || event.originalEvent.detail > 0;
            var T;
            if (down) {
                T = oLine.position().left + 20;
            } else {
                T = oLine.position().left - 20;
            }
            resize(T);
            event.preventDefault();
            return false;
        }

        var oT = $('.js_order_listbox').offset().top;
        $(window).resize(function(){
            oT = $('.js_order_listbox').offset().top;
            size();
        });

        $(window).scroll(function(){
            size();
        });

        function size(){
            var aT = $(document).scrollTop() - oT;
            if(aT>0){
                $('.js_title').each(function(i,d){
                    $(d).css('top',aT);
                });
            }else{
                $('.js_title').each(function(i,d){
                    $(d).css('top',0);
                });
            }
        }

        //新旧二级联动
        BIZTYPE=${BIZTYPE}
        var bizSelect=document.getElementById('bizType');
        document.getElementById('versionType').onchange=function(){
            var value=this.value;
            var data=BIZTYPE[value];
            var fragment=document.createDocumentFragment();
            for(var i=0;i<data.length;i++){
                var option=document.createElement('option');
                option.value=data[i].value;
                option.innerHTML=data[i].html;
                fragment.appendChild(option);
            }
            bizSelect.length=0;
            bizSelect.appendChild(fragment);
        }
    });
</script>
</body>
</html>