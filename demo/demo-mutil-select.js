/**
 * Created by liuxuwen on 18-9-28.
 */
$(function() {
    var optionsss = [
        {value: 'paletxUI-paletxUI-paletxUI-paletxUI-paletxUI-paletxUI-paletxUI-paletxUI',name: 'paletxUI-paletxUI-paletxUI-paletxUI-paletxUI-paletxUI-paletxUI-paletxUI'},
        {value: 'Paas-Paas',name: 'Paas-Paas'},
        {value: 'Iaas-Iaas',name: 'Iaas-Iaas'},
        {value: 'Saas-Saas',name: 'Saas-Saas'},
        {value: 'CMS-CMS',name: 'CMS-CMS'}
    ];
    var optionsss2 = JSON.parse(JSON.stringify(optionsss));
    var optionsss3 = JSON.parse(JSON.stringify(optionsss));
    var optionsss4 = JSON.parse(JSON.stringify(optionsss));
    var optionsss5 = JSON.parse(JSON.stringify(optionsss));
    var optionsss6 = JSON.parse(JSON.stringify(optionsss));
    var optionsss7 = JSON.parse(JSON.stringify(optionsss));
    var optionsss8 = JSON.parse(JSON.stringify(optionsss));
    var defaultSelects1 = [
        {value: 'paletxUI-paletxUI-paletxUI-paletxUI-paletxUI-paletxUI-paletxUI-paletxUI',name: 'paletxUI-paletxUI-paletxUI-paletxUI-paletxUI-paletxUI-paletxUI-paletxUI'},
        {value: 'Iaas-Iaas',name: 'Iaas-Iaas'}
    ];
    var defaultSelects2 = [
        {value: 'Iaas-Iaas',name: 'Iaas-Iaas'},
        {value: 'CMS-CMS',name: 'CMS-CMS'}
    ];
    var disableOptions = [
        {value: 'CMS-CMS',name: 'CMS-CMS'}
    ];
    $("#mutil-select01").bootMultilSelect({options: optionsss,
        defalutSelected: defaultSelects1,
        disable: disableOptions});
    $("#mutil-select02").bootMultilSelect({options: optionsss,
        defalutSelected: defaultSelects1,
        disable: disableOptions,
        disabled:true});
    $("#mutil-select03").bootMultilSelect({options: optionsss2,
        defalutSelected: defaultSelects2,
        disable: disableOptions,
        checkbox:true});
    $("#mutil-select04").bootMultilSelect({options: optionsss3,
        defalutSelected: defaultSelects2,
        disable: disableOptions,
        checkbox:true,
        allcheck:true});
    $("#mutil-select05").bootMultilSelect({options: optionsss4,
        defalutSelected: defaultSelects2,
        disable: [],
        checkbox:true,
        allcheck:true,
        showNum:true});
    $("#mutil-select06").bootMultilSelect({options: optionsss5,
        defalutSelected: defaultSelects2,
        disable: [],
        showNum:true});
    $("#mutil-small").bootMultilSelect({options: optionsss5,
        defalutSelected: defaultSelects2,
        disable: [],
        width: 220});
    $("#mutil-big").bootMultilSelect({options: optionsss5,
        defalutSelected: defaultSelects2,
        disable: [],
        checkbox:true,
        width: 620});
    $("#mutil-select01").on("change.bc.multilselect",function() {
        $(this).next("p").text(JSON.stringify($(this).bootMultilSelect('getSelection')));
    });
});