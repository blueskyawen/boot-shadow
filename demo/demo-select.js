/**
 * Created by liuxuwen on 18-9-27.
 */
$(function() {
    var options1 = [
        {value: 'paletxUI',name: 'paletxUI'},
        {value: 'Iaas',name: 'Iaas'},
        {value: 'Paas',name: 'Paas'},
        {value: 'Saas',name: 'Saas'},
        {value: 'CMS',name: 'CMS'}
    ];
    $("#select-normal").bootSelect({options: options1,
        defalutChecked: '',
        placeholder: '请选择'});
    $("#select-disable").bootSelect({options: options1,
        defalutChecked: 'Paas',
        placeholder: '请选择',
        disable: true});
    $("#select-small-1").bootSelect({options: options1,
        defalutChecked: '',
        placeholder: '请选择',
        width: 220});
    $("#select-small-2").bootSelect({options: options1,
        defalutChecked: '',
        placeholder: '请选择',
        width: 120});
});