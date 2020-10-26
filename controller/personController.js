let Person = require("../model/Person");
const { generateID } = require('./../bin/util');
const { startLoadInitialFamilyTree } = require('./../data/initialData');

const familyMembers = [];

const getUserObjByName = (pName) => {
    return familyMembers.filter((person) => {
        if (person.name === pName) {
            return person;
        } 
    });
}

const getUserObjById = (id) => {
    return familyMembers.filter((person) => {
        if (person.id === id) {
            return person;
        } 
    });
}

const getFatherObjectByPersonName = (pName) => {
    const currentPersonObj = getUserObjByName(pName)[0];
    const currentPersonMother = getUserObjByName(currentPersonObj.motherName)[0];

    const father = familyMembers.filter((member) => {
        if (member.partner === currentPersonMother.id) {
            return member;
        }
    })
    return father
}

const getMotherObjectByPersonName = (pName) => {
    const currentPersonObj = getUserObjByName(pName)[0];
    const currentPersonMother = getUserObjByName(currentPersonObj.motherName);
    return currentPersonMother;
}

const addChild = (childItems) => {
    let personArr = getUserObjByName(childItems[1]);
    if (personArr.length > 0) {
        if(personArr[0].gender === 'Female') {
            const child = new Person(generateID(), childItems[2], childItems[3], childItems[1]);
            familyMembers.push(child);

            let mother = personArr[0];

            // add to mother's children object value 
            if (!mother.hasOwnProperty('children')) {
                mother.children = [];
            }
            mother.children.push(childItems[2]);

            return "CHILD_ADDED";
        } else {
            return "CHILD_ADDITION_FAILED";
        }
    } else {
        return "PERSON_NOT_FOUND";
    }
    
}

const findSiblings = (pName) => {
    const person = getUserObjByName(pName)[0];
    if (person === undefined) {
        return "NONE";
    }
    const personMother = getUserObjByName(person.motherName)[0];
    if ((personMother !== undefined) && (personMother.hasOwnProperty('children')) ){
        let siblings = personMother.children.filter((child) => {
            let thisChild = getUserObjByName(child)[0];
            if (thisChild.name !== pName) {
                return child;  
            } 
        });
        return siblings.length > 0 ?
                siblings.join(" ") : "NONE";
    } 
    return "NONE";
}

const findMaleSiblings = (pName) => {
    const person = getUserObjByName(pName)[0];
    const personMother = getUserObjByName(person.motherName)[0];

    if ( (personMother !== undefined) && (personMother.hasOwnProperty('children')) ) {
        let brothers = personMother.children.filter((child) => {
            let thisChild = getUserObjByName(child)[0];
            if ((thisChild.gender === 'Male') && (thisChild.name !== pName)) {
                return child;  
            } 
        });
        return brothers.length > 0 ?
                brothers.join(" ") : "NONE";
    } 
    return "NONE";
}

const findFemaleSiblings = (pName) => {
    const person = getUserObjByName(pName)[0];
    const personMother = getUserObjByName(person.motherName)[0];

    if ( (personMother !== undefined) && (personMother.hasOwnProperty('children')) ) {
        let brothers = personMother.children.filter((child) => {
            let thisChild = getUserObjByName(child)[0];
            if ((thisChild.gender === 'Female') && (thisChild.name !== pName)) {
                return child;  
            } 
        });
        return brothers.length > 0 ?
                brothers.join(" ") : "NONE";
    } 
    return "NONE";
}

const findMaternalUncles = (pName) => {
    const motherArr = getMotherObjectByPersonName(pName);
    if (motherArr.length > 0) {
        return findMaleSiblings(motherArr[0].name);
    }
    return "NONE"
}


const findPaternalUncles = (pName) => {
    const fatherArr = getFatherObjectByPersonName(pName);
    if (fatherArr.length > 0) {
        return findMaleSiblings(fatherArr[0].name);
    }
    return "NONE"
}

const findMaternalAunts = (pName) => {
    const motherArr = getMotherObjectByPersonName(pName);
    if (motherArr.length > 0) {
        return findFemaleSiblings(motherArr[0].name);
    }
    return "NONE"
}

const findPaternalAunts = (pName) => {
    const fatherArr = getFatherObjectByPersonName(pName);
    if (fatherArr.length > 0) {
        return findFemaleSiblings(fatherArr[0].name);
    }
    return "NONE"
}

const getSpouseObjectByPerson = (person) => {
    let spouseObj;
    if ( person.gender === "Male") { // return partner object of Male 
        spouseObj = getUserObjById(person.partner);
    } else { // return partner object of Female 
        spouseObj = familyMembers.filter((member) => {
            if ( member.partner === person.id) {
                return member;
            } 
        })
    }
    return spouseObj[0];
}

const findSisterInLaw = (pName) => {
    const personObject = getUserObjByName(pName)[0];
    const spouseObject = getSpouseObjectByPerson(personObject);

    let sisterInLaws = [];

    // get spouse's sisters or female siblings
    if ( spouseObject !== undefined ) {
        const spouseFemaleSiblings = findFemaleSiblings(spouseObject.name);
        if ( spouseFemaleSiblings !== "NONE") {
            sisterInLaws.push(spouseFemaleSiblings);
        }
    }   
    
    // get this persons's male sibling's and then get their wives
    const personMaleSiblings = findMaleSiblings(personObject.name).split(" ");
    personMaleSiblings.filter((sibling) => {
        if ( sibling == "NONE") { return "NONE";}
        const siblingObj = getUserObjByName(sibling)[0];
        const partner = getUserObjById(siblingObj.partner)[0];
        if ( partner !== undefined) {
            sisterInLaws.push(partner.name);
        }
    });
    return sisterInLaws.length > 0 ? sisterInLaws.join(" ") : "NONE";
}

const findBrotherInLaw = (pName) => {
    const personObject = getUserObjByName(pName)[0];
    const spouseObject = getSpouseObjectByPerson(personObject);

    let brotherInLaws = [];

    // get spouse's brothers or male siblings
    if ( spouseObject !== undefined ) {
        const spouseMaleSiblings = findMaleSiblings(spouseObject.name);
        if ( spouseMaleSiblings !== "NONE") {
            brotherInLaws.push(spouseMaleSiblings);
        }
    }   
    
    // get this persons's female sibling's and then get their husband
    const personFemaleSiblings = findFemaleSiblings(personObject.name).split(" ");
    personFemaleSiblings.filter((sibling) => {
        if ( sibling == "NONE") { return "NONE";}
        const siblingObj = getUserObjByName(sibling)[0];
        const siblingPartnerObj =  getSpouseObjectByPerson(siblingObj);
        if ( siblingPartnerObj !== undefined) {
            brotherInLaws.push(siblingPartnerObj.name);
        }
    });
    return brotherInLaws.length > 0 ? brotherInLaws.join(" ") : "NONE";
}


const findSon = (pName) => {
    const personObject = getUserObjByName(pName)[0];
    let childMother = personObject;

    if (personObject === undefined) {
        return "NONE";
    }

    if (personObject.gender === "Male") {
        childMother = getSpouseObjectByPerson(personObject);
    }
    let son = [];
    if (childMother.hasOwnProperty('children') && (childMother !== undefined)) {
        son = childMother.children.filter((child) => {
            const thisChild = getUserObjByName(child)[0];
            if(thisChild.gender === "Male") {
                return thisChild.name;
            }
        });
    }

    return son.length > 0 ? son.join(" ") : "NONE";

}

const findDaughter = (pName) => {
    const personObject = getUserObjByName(pName)[0];
    let childMother = personObject;

    if (personObject === undefined) {
        return "NONE";
    }

    if (personObject.gender === "Male") {
        childMother = getSpouseObjectByPerson(personObject);
    }
    let daughters = [];
    if (childMother.hasOwnProperty('children') && (childMother !== undefined)) {
        daughters = childMother.children.filter((child) => {
            const thisChild = getUserObjByName(child)[0];
            if(thisChild.gender === "Female") {
                return thisChild.name;
            }
        });
    }

    return daughters.length > 0 ? daughters.join(" ") : "NONE";

}

const getRelationship = (relationItems) => {
    switch (relationItems[2]) {
        case 'Paternal-Uncle':
            return findPaternalUncles(relationItems[1]);
        case 'Maternal-Uncle':
            return findMaternalUncles(relationItems[1]);
        case 'Paternal-Aunt':
            return findPaternalAunts(relationItems[1]);
        case 'Maternal-Aunt':
            return findMaternalAunts(relationItems[1]);
        case 'Sister-in-Law':
            return findSisterInLaw(relationItems[1]);
        case 'Brother-in-Law':
            return findBrotherInLaw(relationItems[1]);
        case 'Son':
            return findSon(relationItems[1]);
        case 'Daughter':
            return findDaughter("Audrey");
        case 'Siblings':
            return findSiblings(relationItems[1]);
        default:
            return "NONE";
    }
}

const loadInitialFamilyTree = () => {   
    startLoadInitialFamilyTree(familyMembers);
}

module.exports = {
    addChild,
    getRelationship,
    loadInitialFamilyTree
}