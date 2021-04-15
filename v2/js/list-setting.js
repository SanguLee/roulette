/*
var groups = ['선물','김송이T','이인영T',
             '윤정현T','김지연T','장은영T',
             '정운정T','이은경T'];
var items = [
	[], //선물
	['박예은','박주영','오한빛','유희승'], //김송이T
	['장은서','강하연','박귀은','이채민','최준서','신지섭','박연수','원동욱','권오윤'],	//이인영T
	['이동욱','최지훈','고영광','서의진','공민석','김형석'], //윤정현T
	['김진현','김태형','설민호','이유현','한동진','김민서','박수빈','백기정','조한솔','주수연'], //김지연T
	['장세영','이채훈','박민서','박솔비','하재명','이승진','김범균'], //장은영T
	['김중건','문혁준','유화정','조현우','문채영','박수연','이예주'], //정운정T
	['김사랑','김소현','김시원','김윤서','방준서','백승혁','성명기','임채연'] //이은경T
];
*/
const data = new Data();
const browsed = false;

function loadFile(){
	var input = document.createElement("input");
	input.type="file";
	input.accept=".rdb"
	input.click();
	input.onchange = function(event){
		var reader = new FileReader();
		reader.readAsText(event.target.files[0],"UTF-8");
		reader.onload = function(){
			data.setDataText(reader.result);
			data.nowGroupIndex = -1;
			groupDataUpdate();
			browsed = true;
		};
	};
}
function saveFile() {
	var str = encoding();
    var output = document.createElement('a');
    output.href = 'data:attachment/text,' + encodeURI(str);
    output.target = '_blank';
    output.download = "save.rdb";
    output.click();
}

// 파일 불러올 시, 그룹 이름들을 selectBox에 집어넣기
function groupDataUpdate(){
	$('li.group-item').remove();
	$('.nice-select').remove();
	$('#selectBox option').remove();
	
	removeAll();
	loadItems(data.nowGroupIndex);

	allGroupTitles = data.getAllGroupTitles();
	if(allGroupTitles==null) return -1;
	console.log(allGroupTitles[0]);
	for(i=0;i<allGroupTitles.length;i++){
		createGroupItem(allGroupTitles[i]);
		$('#selectBox').append("<option value='" + i + "'>" + allGroupTitles[i] + "</option>");
	}
	
	console.log(data.getData());
	$('#selectBox').niceSelect();
}

// toggle 버튼 누름으로써, 전체 요소들 toggleClass, Toggle 
function toggle() {
	$('.wrap-left, .wrap-right').each(function(i,e){
		$(e).toggleClass("toggle");
	});
	$('.group-list-con, .group-list').toggleClass("toggle");
	if(!$('.group-list-con').hasClass("toggle")){
		groupDataUpdate();
		console.log(data.getData());
	}
}

// group-item을 미리 복사해놓는 과정 + sortable()
$(document).ready(function () {
	var $gl = $('li.group-item');
	var $cg = $gl.clone();
	$gl.remove();

	window.createGroupItem = function(text) {
		$cg.find('.group-title').text(text);
		if($('.group-list').hasClass("toggle"))
			$cg.addClass("init");
		$('.group-list').append($cg.clone());
	}

	var beIdx=-1;
	var atIdx=beIdx;
	$('.group-list').sortable({
		start: function (event, ui) {
			console.log("start: " + ui.item.index());
			beIdx = ui.item.index();
		},
		update: function (event, ui) {
			console.log("update: " + ui.item.index());
			atIdx = ui.item.index();
			data.moveGroup(beIdx,atIdx);
		}
	});
});

$(document).on('keydown', function(evt) {
	var $target = $(evt.target);
	if (evt.key === 'Enter') {
		updateGroup();
	}
});
function updateGroup(){
	allGroupTitles = [];
	$('li.group-item').each(function(i, e) {
		var $e = $(e);
		var title = $e.find('.group-title').text();
		if(!title) return;
		data.setGroupText(i, title);
	});
}
$(document).on('click', function(evt) {
	var $target = $(evt.target);
	if($target.is('.group-title')){
		$('.group-list').sortable("disable");
		$(evt.target).attr('contenteditable','true');
	}
	else if($target.is('.group-add')){
		blank = '';
		createGroupItem(blank);
		data.addGroup(blank);
		console.log("group added");
	}
	else if($target.is('.group-list-con, .group-list')){
		if($('.group-list').hasClass('ui-sortable-disabled')){
			$('.group-list').sortable("enable");
			$('.group-title').attr('contenteditable','false');
		}
	}
	else if(!$target.is('.group-btn')&&!$target.is('.group-item')){
		if($('.group-list-con').hasClass('toggle')){
			toggle(); 
		}
	}
});

function subGroup(){
	if(data.nowGroupIndex != -1){
		data.removeGroup(data.nowGroupIndex);
		data.nowGroupIndex -= 1;
		groupDataUpdate();
	}
}

// 바뀐 items 들을 items 배열에 집어넣기
function loadItems(groupIndex){
	groupItems = data.getGroupItems(groupIndex);
	for(i=0;i<groupItems.length;i++){
		addItem(groupItems[i]);
	}
}

function groupSelected() {
	data.nowGroupIndex = $('#selectBox option:selected').val();
	console.log(data.nowGroupIndex);

	removeAll();
	loadItems(data.nowGroupIndex);

	cleanList();
	updateData();
}

// 시작 시, 빈 그룹 목록 만들기
$(document).ready(function (){
	groupDataUpdate();
});