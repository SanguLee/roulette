class Data {
    #data= [];
    #stack = 0;

    constructor () {
        this.nowGroupIndex = 0;
        this.addGroup('빈 그룹');
        console.log('class data start');
    }

    setData(_data){
        this.#data = _data;
    }
    getData(){
        return this.#data;
    }

    addGroup(groupTitle) {
        this.#stack++
        this.#data.push([groupTitle,[]]);
    }
    removeGroup(groupIndex) {
        if(groupIndex>this.#data.length) return -1;
        this.#stack--;
        this.#data.splice(groupIndex,1);
    }
    moveGroup(groupIndex, pos){
        console.log(this.#moveArray(groupIndex, pos));
    }
    setGroupText(groupIndex, groupTitle){
        if(groupIndex>this.#data.length) return -1;
        this.#data[groupIndex][0] = groupTitle;
    }

    addItem(groupIndex, itemTitle) {
        this.#data[groupIndex][1].push(itemTitle);
    }
    removeItem(groupIndex, itemIndex) {
        if(groupIndex>this.#data.length||itemIndex>this.#data[groupIndex][1].length) return -1;
        this.#data[groupIndex][1].splice(itemIndex,1);
    }
    moveItem(itemIndex, pos){
        this.#moveArray(itemIndex, pos);
    }
    setItemTitle(groupIndex, itemIndex, itemTitle){
        if(groupIndex>this.#data.length||itemIndex>this.#data[groupIndex][1].length) return -1;
        this.#data[groupIndex][1][itemIndex] = itemTitle;
    }

    #moveArray(be, at){
        var tmpData = [];
        var tmpSpliced = [];
        
        if(be==at) return -1;
        
        if(this.#data==null) return -2;
        else tmpData = this.#data;

        if(!this.#data.length>at) return -3;
        else {
            if(this.#data[be] == null) return -4;
            tmpSpliced = tmpData.splice(be,1)[0];
            
            if(at==0){
                this.#data.unshift(tmpSpliced);
            }
            else {
                if(!be<at) at--;
                tmpData.splice(at,0,tmpSpliced);
            }
            return 0;
        }
    }

    // to browse or download file from this data
    #decoding(text){
        var tmpArray = text.split('$');
        tmpArray.shift(); // 첫 번째 그룹 이전의 공백 제거
        for(var i=0;i<tmpArray.length;i++){
            tmpArray[i]=tmpArray[i].split(':');
            tmpArray[i][1]=tmpArray[i][1].split(';');
            tmpArray[i][1].pop(); // 각 그룹마다 아이템에서 마지막 제거
        }
        return tmpArray;
    }
    #encoding(arr){
        var str = '';
        var data = arr;
        for(var i=0;i<data.length;i++){
            str += ('$' + data[i][0] + ':');
            if(data[i][1].length>0)
            for(var j=0;j<data[i][1].length;j++){
                str += (data[i][1][j] + ';');
            }
        }
        return str;
    }

    getDataText(){
        return this.#encoding(this.#data);
    }
    setDataText(text){
        this.#data = this.#decoding(text);
    }
    

    getAllGroupTitles(){
        var tmpArray = [];
        for(var i = 0; i<this.#data.length; i++){
            tmpArray.push(this.#data[i][0]);
        }
        return tmpArray;
    }
    getGroupTitle(groupIndex){
        if(groupIndex>this.#data.length) return -1;
        return this.#data[groupIndex][0];
    }
    getGroupItems(groupIndex){
        if(groupIndex>this.#data.length) return -1;
        return this.#data[groupIndex][1];
    }

}