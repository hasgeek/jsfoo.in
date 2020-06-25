// For conference and workshop schedule
//dateStr is expected in the format 2015-07-16", then returns "Thu Jul 16 2015"
function parseJson(e,t,s){var n=e.schedule,i=[],o=[],a=0,r=0;n.forEach(function(e,t,s){var n=[];s[t].date=getDateString(e.date),s[t].tableid="table-"+t,e.slots.forEach(function(e,i,o){var a=e.sessions;i===0&&(s[t].start=getIST(getTimeString(e.sessions[0].start))),i===o.length-1&&(s[t].end=getIST(getTimeString(e.sessions[a.length-1].end))),a.forEach(function(e,o){e.section_name&&e.section_name.toLowerCase().indexOf("workshop")!==-1&&(s[t].type="workshop"),e.room&&n.indexOf(e.room)===-1&&n.push(e.room),s[t].slots[i].sessions[o].start=getIST(getTimeString(e.start)),s[t].slots[i].sessions[o].end=getIST(getTimeString(e.end))}),s[t].type!=="workshop"&&(s[t].type="conference")}),n.sort(),n.forEach(function(e,t,s){s[t]={name:e,title:getAudiTitle(e),shorttitle:getShortAudiTitle(e),track:t}}),s[t].rooms=n,e.slots.forEach(function(e,i){var o=e.sessions;o.forEach(function(e,o){e.room&&(s[t].slots[i].sessions[o].track=getTrack(e.room,n),s[t].slots[i].sessions[o].roomTitle=getAudiTitle(e.room))})}),s[t].type==="conference"?(o.push({date:s[t].date,tableid:s[t].tableid,rooms:s[t].rooms,start:s[t].start,end:s[t].end}),createTable(o[a]),a+=1):(i.push({date:s[t].date,rooms:s[t].rooms,start:s[t].start,end:s[t].end}),createTable(i[r]),r+=1)}),a=0,r=0,n.forEach(function(e){e.slots.forEach(function(e){e.sessions.length>1&&e.sessions.sort(function(e,t){return e.track-t.track})}),e.type==="conference"?(pushSessions(o[a],e.slots),addRowSpan(o[a]),checkColumns(o[a]),a+=1):(pushSessions(i[r],e.slots),addRowSpan(i[r]),checkColumns(i[r]),r+=1)}),t==="conference"?renderScheduleTable(o,"conference",s):renderScheduleTable(i,"workshop",s)}var getDateString=function(e){var t=parseInt(e.substr(0,4),10),s=parseInt(e.substr(5,2),10)-1,n=parseInt(e.substr(8,2),10),i=new Date;return i.setFullYear(t,s,n),i.toDateString()},getTimeString=function(e){return e.substr(e.indexOf("T")+1,5)},getHrMin=function(e){var t=e.substring(0,e.indexOf(":")),s=e.substring(e.indexOf(":")+1);return[t,s]},getdateObject=function(e,t){var s=new Date;return s.setHours(e),s.setMinutes(t),s},toTimeString=function(e){return(10>e.getHours()?"0":"")+e.getHours()+":"+((10>e.getMinutes()?"0":"")+e.getMinutes())},getIST=function(e){var t=parseInt(getHrMin(e)[0],10)+5,s=parseInt(getHrMin(e)[1],10)+30,n=getdateObject(t,s);return ist=toTimeString(n)},createTable=function(e){var t,s,n,i,o;t=getHrMin(e.start)[0],s=getHrMin(e.start)[1],n=getdateObject(t,s),t=getHrMin(e.end)[0],s=getHrMin(e.end)[1],i=getdateObject(t,s),e.slots=[];do o=toTimeString(n),e.slots.push({slot:o,issession:!1,sessions:[],occupied:"empty"}),n.setMinutes(n.getMinutes()+5);while(i>=n)},getTotalMins=function(e){var t=parseInt(getHrMin(e)[0],10),s=parseInt(getHrMin(e)[1],10);return t*60+s},getAudiTitle=function(e){return e.substring(e.indexOf("/")+1).replace(/-/g," ")+", "+e.substring(0,e.indexOf("/")).replace(/-/g," ")},getShortAudiTitle=function(e){return e.substring(e.indexOf("/")+1).replace(/-/g," ")},getTrack=function(e,t){var s;for(s=0;t.length>s;s++)if(t[s].name===e)return t[s].track},pushSessions=function(e,t){t.forEach(function(t){var s=t.sessions;s.forEach(function(t){var s=getTotalMins(t.start);getTotalMins(t.end),e.slots.forEach(function(e,n,i){getTotalMins(e.slot)===s&&(i[n].sessions.push(t),i[n].issession=!0)})})})},addRowSpan=function(e){e.slots.forEach(function(t,s,n){if(t.issession){(t.sessions[0].track===0||t.sessions[0].is_break)&&(t.occupied=0);var i=t.sessions;for(sessionindex=0;i.length>sessionindex;sessionindex++){var o=getTotalMins(i[sessionindex].end),a=s+1,r=1,c=!1;for(a=s+1;n.length>a;a++){if(n[a].issession===!0&&getTotalMins(n[a].sessions[0].start)>=o)break;n[a].issession===!0&&o>getTotalMins(n[a].sessions[0].start)&&(c=!0,r+=1)}c&&(e.slots[s].sessions[sessionindex].rowspan=r)}}})},checkColumns=function(e){for(var t=0;e.slots.length>t;t++)if(e.slots[t].issession&&e.slots[t].occupied!==0){var s=!1;for(j=t-1;j>0;j--)e.slots[j].issession&&getTotalMins(e.slots[j].sessions[0].end)>getTotalMins(e.slots[t].sessions[0].start)&&(s=!0);if(s===!1){var n=parseInt(getHrMin(e.slots[t].sessions[0].start)[0],10),i=parseInt(getHrMin(e.slots[t].sessions[0].start)[1],10)+5,o=getdateObject(n,i),a=toTimeString(o);e.slots[t].sessions[1]=e.slots[t].sessions[0],e.slots[t].sessions[0]={track:"empty",start:e.slots[t].sessions[1].start,end:a}}}},renderResponsiveTable=function(){$("td.tab-active").attr("colspan",3)},disableResponsiveTable=function(){$("td").not(".centered").attr("colspan","")},renderScheduleTable=function(e,t,s){e.forEach(function(e){var n=$("#scheduletemplate").html();t==="conference"?($(s).append(Mustache.render(n,e)),$(".schedule-table-container p.loadingtxt").hide()):($(s).append(Mustache.render(n,e)),$(".schedule-table-container p.loadingtxt").hide())}),768>$(window).width()&&renderResponsiveTable()};$(document).ready(function(){if($(".site-navbar").length)var e=$(".site-navbar").offset().top;var t=$(window).width();$(window).resize(function(){t=$(window).width()}),$(window).scroll(function(){$(this).scrollTop()>e?$(".site-navbar").addClass("nav-fixed"):$(".site-navbar").removeClass("nav-fixed")}),$("#menu-btn").click(function(){$("#dropdown-menu").hasClass("off")?$("#dropdown-menu").slideDown().removeClass("off"):$("#dropdown-menu").slideUp().addClass("off")}),$(".smooth-scroll").click(function(e){e.preventDefault();var t=$(this).attr("href"),s=$(""+t).offset().top-$(".site-navbar").height();$("html,body").animate({scrollTop:s},"900")}),$(".turn-right").click(function(){$(this).parent(".box-front-side").addClass("flip").delay(400).queue(function(){$(this).removeClass("show-side").removeClass("flip"),$(this).parents(".box").find(".box-back-side").addClass("show-side"),$(this).clearQueue()})}),$(".turn-left").click(function(){$(this).parent(".box-back-side").addClass("flip").delay(400).queue(function(){$(this).removeClass("show-side").removeClass("flip"),$(this).parents(".box").find(".box-front-side").addClass("show-side"),$(this).clearQueue()})}),setTimeout(function(){$(".heading-text .text1").animate({right:0},500),$(".heading-text .text2").animate({left:0},500),$(".heading-text .ticket-btn, .heading-text .transfer-links").animate({top:0},500)},500);var s="https://jsfoo.talkfunnel.com/2016/schedule/json";$(".schedule-table-container").length&&($("#jsfooconferenceschedule").length&&(funnelurl=s,divContainer="#jsfooconferenceschedule",eventType="conference"),$.ajax({type:"GET",dataType:"jsonp",url:funnelurl,success:function(e){parseJson(e,eventType,divContainer)}})),$(window).resize(function(){768>$(window).width()?renderResponsiveTable():disableResponsiveTable()}),$("#jsfooconferenceschedule").on("click","table td .js-expand",function(){$(this).hasClass("fa-caret-right")?($(this).removeClass("fa-caret-right").addClass("fa-caret-down"),$(this).parents("td").find(".description-text").slideDown()):($(this).removeClass("fa-caret-down").addClass("fa-caret-right"),$(this).parents("td").find(".description-text").slideUp())}),$("#jsfooconferenceschedule").on("click","table th.track0, table th.track1, table th.track2",function(){if(768>$(window).width()){var e=$(this).parents("table"),t=$(this).attr("data-td");e.find(".tab-active").removeClass("tab-active"),$(this).addClass("tab-active"),e.find("."+t).addClass("tab-active"),renderResponsiveTable()}}),$("#boxoffice-widget").popover({selector:".t-shirt-image",placement:"right",trigger:"hover",html:!0}),$(".expand-cancel-form").on("click",function(e){e.preventDefault(),$(".cancel-tickets").hide(),$(".cancelticket-status").html("").hide();var t=$(this).attr("data-target");$(t).slideDown("slow")}),$(".close-form").on("click",function(e){e.preventDefault(),$(this).parents(".cancel-tickets").slideUp(),$(".cancelticket-status").html("").hide()});var n,i='We are sad that you wouldn&#39;t be able to come. Your cancellation request is being processed, you should receive a refund within 7 working days. Feel free to get in touch at <a href="mailto:info@hasgeek.com" class="link-silent orange">info@hasgeek.com</a> for further queries.',o='We are sad that you wouldn&#39;t be able to come. Your transfer request is being processed. Feel free to get in touch at <a href="mailto:info@hasgeek.com" class="link-silent orange">info@hasgeek.com</a> for further queries.';$("#cancelticket, #transferticket").on("submit",function(e){e.preventDefault(),$(".cancelticket-status").html("");for(var t=$(this).serializeArray(),s=!0,a={},r={},c=0;t.length>c;c++)t[c].value===""&&($(".cancelticket-status").html("Please fill all the fields"),s=!1),a[t[c].name]=t[c].value;if(s){a.type==="Cancel"?(n="cancelticket",r={"Order no.":a["order-no"],"Ticket no.":a["ticket-no"],Email:a["ticket-email"],Type:a.type,Event:"JSFoo 2015"}):(n="transferticket",r={"Order no.":a["order-no"],"Ticket no.":a["ticket-no"],Email:a["ticket-email"],Type:a.type,"Transferee name":a["transferee-name"],"Transferee email":a["transferee-email"],"Transferee phone":a["transferee-phone"],Event:"JSFoo 2015"}),p="Are you sure you want to "+a.type+" your ticket?";var l=window.confirm(p);l&&($(".submit-loader").show(),$.ajax({type:"post",url:"https://script.google.com/macros/s/AKfycbycMp_bW4uj2JmUS4a0ghe7W7xfUzrIP28AV_6wQihg5kX9pDxI/exec",data:r,dataType:"json",timeout:5e3,complete:function(e){$(".submit-loader").hide(),e.status===200?($("#"+n)[0].reset(),n==="cancelticket"?$(".cancelticket-status").show().html(i):$(".cancelticket-status").show().html(o)):$(".cancelticket-status").show().html("Error, try again")}}))}}),$("#subscribe").on("submit",function(e){e.preventDefault(),$(".subscribe-status").html("");var t={};$("#subscribe-email").val()===""?$(".subscribe-status").html("Please enter an email id"):(t={Email:$("#subscribe-email").val(),Event:"JSFoo 2016"},$(".ajax-loader").css("visibility","visible"),$.ajax({type:"post",url:"https://script.google.com/macros/s/AKfycbwkkVFfdoQF7_aozgUPyfxDuuxOrN2melaehVBcsuP84Fa7Vks/exec",data:t,dataType:"json",timeout:5e3,complete:function(e){$(".ajax-loader").css("visibility","hidden"),e.status===200?($("#subscribe")[0].reset(),$(".subscribe-status").show().html("Thank you for subscribing!")):$(".subscribe-status").show().html("Error, try again.")}}))})});