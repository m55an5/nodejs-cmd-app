let Person = require("../model/Person");

const familyMembers = [];
const ID_LENGTH = 5;

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
    const personMother = getUserObjByName(person.motherName)[0];
    if (personMother.hasOwnProperty('children')) {
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

    let king = new Person(generateID(), "King Arthur", "Male", null);
    let queen = new Person(generateID(), "Queen Margret", "Female", null);
    king.partner = queen.id;


    let bill = new Person(generateID(), "Bill", "Male", queen.name);
    let flora = new Person(generateID(), "Flora", "Female", null);
    bill.partner = flora.id;

    let victoire = new Person(generateID(), "Victoire", "Female", flora.name);
    let ted = new Person(generateID(), "Ted", "Male", null);
    ted.partner = victoire.id;

    let remus = new Person(generateID(), "Remus", "Male", victoire.name);

    let dominique = new Person(generateID(), "Dominique", "Female", flora.name);

    let louis = new Person(generateID(), "Louis", "Male", flora.name);


    let charlie = new Person(generateID(), "Charlie", "Male", queen.name);    

    let percy = new Person(generateID(), "Percy", "Male", queen.name);    
    let audrey = new Person(generateID(), "Audrey", "Female", null);
    percy.partner = audrey.id;

    let molly = new Person(generateID(), "Molly", "Female", audrey.name);
    let lucy = new Person(generateID(), "Lucy", "Female", audrey.name);


    let ronald = new Person(generateID(), "Ronald", "Male", queen.name);
    let helen = new Person(generateID(), "Helen", "Female", null);
    ronald.partner = helen.id;

    let malfoy = new Person(generateID(), "Malfoy", "Male", null);
    let rose = new Person(generateID(), "Rose", "Female", helen.name);
    malfoy.partner = rose.id;

    let draco = new Person(generateID(), "Draco", "Male", rose.name);

    let aster = new Person(generateID(), "Aster", "Female", rose.name);

    let hugo = new Person(generateID(), "Hugo", "Male", helen.name);


    let ginerva = new Person(generateID(), "Ginerva", "Female", queen.name);
    let harry = new Person(generateID(), "Harry", "Male", null);
    harry.partner = ginerva.id;

    let darcy = new Person(generateID(), "Darcy", "Female", null);
    let james = new Person(generateID(), "James", "Male", ginerva.name);
    james.partner = darcy.id;

    let willaim = new Person(generateID(), "William", "Male", darcy.name);

    let albus = new Person(generateID(), "Albus", "Male", ginerva.name);
    let alice = new Person(generateID(), "Alice", "Female", null);
    albus.partner = alice.id;

    let ron = new Person(generateID(), "Ron", "Male", alice.name);

    let ginny = new Person(generateID(), "Ginny", "Female", alice.name);
    
    let lily = new Person(generateID(), "Lily", "Female", ginerva.name);

    // adding children to mothers
    queen.children = [bill.name, charlie.name, percy.name, ronald.name, ginerva.name];
    
    flora.children = [victoire.name, dominique.name, louis.name];

    victoire.children = [remus.name];

    audrey.children = [molly.name, lucy.name];

    helen.children = [rose.name, hugo.name];

    rose.children = [draco.name, aster.name];

    ginerva.children = [james.name, albus.name, lily.name];

    darcy.children = [willaim.name];

    alice.children = [ron.name, ginny.name];


    // adding all members to in memory list
    familyMembers.push(king, queen, bill, flora, victoire, ted, remus, dominique, louis,
                        charlie, percy, audrey, molly, lucy,
                        ronald, helen, malfoy, rose, draco, aster, hugo,
                        ginerva, harry, darcy, james, willaim, alice, albus,
                        ron, ginny, lily);
}

function generateID() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < ID_LENGTH; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

module.exports = {
    addChild,
    getRelationship,
    loadInitialFamilyTree
}