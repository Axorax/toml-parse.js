const tomlParse = {
    toJSON: function(tomlCode) {
        const json = {};

        const lines = tomlCode.split('\n');
        let currentTable = json;

        for (let line of lines) {
            line = line.trim();

            if (line.startsWith('#') || line === '') {
                continue;
            }

            if (line.startsWith('[') && line.endsWith(']')) {
                const tableName = line.slice(1, -1).trim();
                currentTable = tomlParse.getTable(json, tableName);
            } else {
                const separatorIndex = line.indexOf('=');
                if (separatorIndex !== -1) {
                    const key = line.slice(0, separatorIndex).trim();
                    const value = line.slice(separatorIndex + 1).trim();
                    tomlParse.setKey(currentTable, key, tomlParse.parseValue(value));
                }
            }
        }

        return json;
    },

    fromJSON: function(json) {
        let tomlCode = '';

        const processObject = function(obj, indentation = '') {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const value = obj[key];
                    if (typeof value === 'object' && value !== null) {
                        tomlCode += `${indentation}[${key}]\n`;
                        processObject(value, `${indentation}  `);
                    } else {
                        tomlCode += `${indentation}${key} = ${tomlParse.toTomlValue(value)}\n`;
                    }
                }
            }
        };

        processObject(json);

        return tomlCode;
    },

    getTable: function(json, tableName) {
        const tableNames = tableName.split('.');
        let currentTable = json;

        for (let name of tableNames) {
            if (!currentTable.hasOwnProperty(name)) {
                currentTable[name] = {};
            }
            currentTable = currentTable[name];
        }

        return currentTable;
    },

    setKey: function(json, key, value) {
        if (typeof json === 'object' && json !== null) {
            json[key] = value;
        }
    },

    parseValue: function(value) {
        if (value === 'true') {
            return true;
        } else if (value === 'false') {
            return false;
        } else if (/^-?\d*\.?\d+$/.test(value)) {
            return parseFloat(value);
        } else {
            return value;
        }
    },

    toTomlValue: function(value) {
        if (typeof value === 'string') {
            return `"${value}"`;
        } else if (typeof value === 'boolean') {
            return value ? 'true' : 'false';
        } else if (typeof value === 'number') {
            return value.toString();
        } else if (value instanceof Date) {
            return value.toISOString();
        } else {
            return '';
        }
    },

    toCSS: function(tomlCode) {
        let cssCode = '';

        const lines = tomlCode.split('\n');
        let currentSelector = '';

        for (let line of lines) {
            line = line.trim();

            if (line.startsWith('#') || line === '') {
                // Skip comments and empty lines
                continue;
            }

            if (line.startsWith('[') && line.endsWith(']')) {
                // Selector (table header)
                currentSelector = line.slice(1, -1).trim();
            } else {
                // Property-value pair
                const separatorIndex = line.indexOf('=');
                if (separatorIndex !== -1) {
                    const property = line.slice(0, separatorIndex).trim();
                    const value = line.slice(separatorIndex + 1).trim();
                    cssCode += `${currentSelector} {\n  ${property}: ${value};\n}\n`;
                }
            }
        }

        return cssCode;
    },

    fromCSS: function(cssCode) {
        const tomlCode = [];
        const ruleRegex = /([^{]+)\s*{([^}]+)}/g;

        let match;
        while ((match = ruleRegex.exec(cssCode)) !== null) {
            const selector = match[1].trim();
            const declarations = match[2].split(';');

            const tablePath = selector.split(',').map((s) => s.trim()).join('.');
            const properties = {};

            for (const declaration of declarations) {
                const [property, value] = declaration.split(':').map((s) => s.trim());
                if (property && value) {
                    properties[property] = value;
                }
            }

            if (Object.keys(properties).length > 0) {
                const tablePathLine = `[${tablePath}]`;
                tomlCode.push(tablePathLine);
                for (const [property, value] of Object.entries(properties)) {
                    const propertyLine = `${property} = ${value}`;
                    tomlCode.push(propertyLine);
                }
            }
        }

        return tomlCode.join('\n');
    }
};