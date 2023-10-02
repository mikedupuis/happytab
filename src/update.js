class UpdateNotification {
    static VERSIONS = [
        {
            versionId: 1,
            versionString: "1.0.0",
            text: "The weather widget now supports multiple zipcodes! Simply enter your zipcode like \"55427, 78205\" in the \"Weather Zipcode\" on the options menu"
        }
    ];

    constructor(oldVersionId) {
        this.oldVersionId = oldVersionId;
    }

    execute() {
        var updateVersions = this.gatherUpdateVersions(this.oldVersionId)
        this.insertUdpateElements(updateVersions);
    }

    gatherUpdateVersions(currentVersionId) {
        var updateVersions = [];

        UpdateNotification.VERSIONS.forEach(function(version) {
            if (version.versionId > currentVersionId) {
                updateVersions.push(version);
            }
        });

        return updateVersions;
    }

    insertUdpateElements(updates) {
        let sideNavElement = document.getElementById('sidenav');
        let updatesElement = createElementWithId('div', 'updates');
        updates.forEach(function (update) {
            let updateElement = this.createUpdateElement(update);
            updatesElement.appendChild(updateElement);
        }.bind(this));

        sideNavElement.appendChild(updatesElement);
    }

    createUpdateElement(update) {
        let updateElement = createElementWithId('div', 'update-' + update.versionId);
        updateElement.classList.add("update")

        updateElement.appendChild(this.createUpdateIconElement(update));
        updateElement.appendChild(this.createUpdateTextElement(update));

        return updateElement;
    }
    
    createUpdateIconElement(update) {
        let icon = createIconWithId("fas", "fa-times-circle", "fa-lg", 'update-x-button-' + update.versionId)
        icon.classList.add("update-icon")

        icon.addEventListener('click', {
            version: update.versionId,
            handleEvent: function (event) {
                updateAcknowledgedOptionsNumber(this.version)
                deleteItemWithId(icon.parentElement.id)
            }
        });
        return icon;
    }

    createUpdateTextElement(update) {
        let text = createElementWithId('p', 'update-' + update.versionId);
        text.classList.add("update-text")
        text.textContent = update.text;

        return text;
    }
}
