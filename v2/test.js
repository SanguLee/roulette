$(document).ready(function(){
    const data = new Data();
    var sampleData = '$안:이;뭐;함;$정:글;차;이;';
    data.setDataText(sampleData);

    /* 여기에 실험하기 */

    data.moveGroup(1,0);
    data.removeGroup(1);
    data.addGroup('ss');
    data.addItem(1,'d');
    console.log(data.getAllGroupTitles());
    data.setGroupText(0,'안');
    console.log(data.getGroupItems(0)[1]);

    /* 여기까지 실험하기 */
    
    //console.log(data.getData());
    console.log(data.getData());
});