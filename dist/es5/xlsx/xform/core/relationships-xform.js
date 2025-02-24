"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var XmlStream = require('../../../utils/xml-stream');

var BaseXform = require('../base-xform');

var RelationshipXform = require('./relationship-xform');

var RelationshipsXform =
/*#__PURE__*/
function (_BaseXform) {
  _inherits(RelationshipsXform, _BaseXform);

  function RelationshipsXform() {
    var _this;

    _classCallCheck(this, RelationshipsXform);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RelationshipsXform).call(this));
    _this.map = {
      Relationship: new RelationshipXform()
    };
    return _this;
  }

  _createClass(RelationshipsXform, [{
    key: "render",
    value: function render(xmlStream, model) {
      model = model || this._values;
      xmlStream.openXml(XmlStream.StdDocAttributes);
      xmlStream.openNode('Relationships', RelationshipsXform.RELATIONSHIPS_ATTRIBUTES);
      var self = this;
      model.forEach(function (relationship) {
        self.map.Relationship.render(xmlStream, relationship);
      });
      xmlStream.closeNode();
    }
  }, {
    key: "parseOpen",
    value: function parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }

      switch (node.name) {
        case 'Relationships':
          this.model = [];
          return true;

        default:
          this.parser = this.map[node.name];

          if (this.parser) {
            this.parser.parseOpen(node);
            return true;
          }

          throw new Error("Unexpected xml node in parseOpen: ".concat(JSON.stringify(node)));
      }
    }
  }, {
    key: "parseText",
    value: function parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
  }, {
    key: "parseClose",
    value: function parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          this.model.push(this.parser.model);
          this.parser = undefined;
        }

        return true;
      }

      switch (name) {
        case 'Relationships':
          return false;

        default:
          throw new Error("Unexpected xml node in parseClose: ".concat(name));
      }
    }
  }]);

  return RelationshipsXform;
}(BaseXform);

RelationshipsXform.RELATIONSHIPS_ATTRIBUTES = {
  xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships'
};
module.exports = RelationshipsXform;
//# sourceMappingURL=relationships-xform.js.map
