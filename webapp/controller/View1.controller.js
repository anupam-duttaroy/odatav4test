sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,ODataModel, MessageBox) {
        "use strict";

        return Controller.extend("posttestapp.controller.View1", {
            onInit: function () {
                
            },

            handleCreate: function () {
                debugger;

                try {
                    sap.ui.getCore().getMessageManager().removeAllMessages();
                    var id = this.getView().byId("studentId").getValue();
                    var name = this.getView().byId("studentName").getValue();
                    var oModel = this.getOwnerComponent().getModel();
                    var that = this;
                    //var oList = this.byId("test"),
                        // oBinding = oList.getBinding("items"),
                    var oBinding = oModel.bindList("/Students"),
                        oContext = oBinding.create({
                            "id": id,
                            "name": name
                        });

                    oBinding.attachCreateCompleted(function (oEvent) {
                        debugger;
                        if (oEvent.getParameter("success")) {
                            MessageBox.success(`Entry ${id} Added`, {title: 'Success'});
                            that.getView().byId("studentId").setValue('');
                            that.getView().byId("studentName").setValue('');
                            that.byId("test").getBinding("items").refresh();
                        } else {
                            var msgErr = sap.ui.getCore().getMessageManager().getMessageModel().getData()[0].message;
                            MessageBox.error(msgErr, {
                                title: 'Error'
                            });
                        }
                    });
                    


                    oContext.created().then(function () {
                        debugger;
                        var res = oContext;
                    }, function (oError) {
                        debugger;
                        var err = oError.toString();
                    });
                    
                } catch (err) { debugger; }
            }
        });
    });
