var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function loadMatches() {
    fetch('/matches')
        .then(function (response) { return response.json(); })
        .then(function (matches) {
        var matchListElement = document.getElementById('match-history');
        matchListElement.innerHTML = "";
        matches.forEach(function (match) {
            matchListElement.appendChild(createMatchElement(match));
        });
    });
}
function createMatchElement(match) {
    var matchElement = document.createElement('li');
    matchElement.className = 'match';
    var nameElement = document.createElement('span');
    nameElement.innerText = match.name;
    matchElement.appendChild(nameElement);
    return matchElement;
}
function openForm() {
    document.getElementById("matchForm").style.display = "block";
}
function closeForm() {
    document.getElementById("matchForm").style.display = "none";
}
function sendMatchRequest() {
    closeForm();
    var productArea = document.getElementById('product_area').value;
    // Create the request to send to the server using the data we collected from
    // the web form.
    var matchRequest = new MatchRequest(productArea);
    queryServer(matchRequest).then(function (matches) {
        displayNewMatchPopup(matches);
    });
}
function displayNewMatchPopup(matches) {
    var newMatchContainer = document.getElementById('new-matches');
    // clear out any old results
    newMatchContainer.innerHTML = '';
    // add results to the page
    for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
        var match = matches_1[_i];
        newMatchContainer.innerHTML += '<li>' + matchToString(match) + '</li>';
    }
}
function matchToString(match) {
    return match.name;
}
/**
 * Sends the meeting request to the server and get back the matches.
 */
function queryServer(matchRequest) {
    return __awaiter(this, void 0, void 0, function () {
        var json;
        return __generator(this, function (_a) {
            json = JSON.stringify(matchRequest);
            return [2 /*return*/, fetch('/new-matches-query', { method: 'POST', body: json })
                    .then(function (response) {
                    return response.json();
                })
                    .then(function (users) {
                    // Convert the range from a json representation to our Match class.
                    var out = [];
                    users.forEach(function (range) {
                        out.push(new Match(range.name));
                    });
                    return out;
                })];
        });
    });
}
var MatchRequest = /** @class */ (function () {
    function MatchRequest(productArea) {
        this.productArea = productArea;
    }
    return MatchRequest;
}());
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.toMatch = function () {
        var newMatch = new Match(this.name);
        return newMatch;
    };
    return User;
}());
var Match = /** @class */ (function () {
    function Match(name) {
        this.name = name;
    }
    return Match;
}());
