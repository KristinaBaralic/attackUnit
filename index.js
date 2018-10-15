function Unit(name, health) {
    this.name = name;
    this.health = health;

    this.rechargeTime = function() {
        return 1000 * this.health / 100;
    }

    this.damage = function() {
        return this.health / 100;
    }

    this.criticalChance = function() {
        return 10 - health / 10;
    }

    this.getHit = function(dmg) {
        this.health -= dmg;
        if (this.health <= 0) {
            this.die();
        }
    }

    this.die = function() {
        clearTimeout(this.timeout);
        let i = units.indexOf(this);
        if (i != -1) {
            units.splice(i, 1);
        }
        console.log(this.name, "died");
    }

    this.pickTarget = function() {
        let target = null;
        do {
            let j = Math.floor(Math.random() * units.length);
            target = units[j];
        } while (target === this)
        return target;
    }

    this.attack = function() {
        if (units.length <= 1) {
            console.log("winner", this.name);
            return;
        }

        let tar = this.pickTarget();
        let dmg = this.damage();
        let crit = "";
        if (Math.floor(Math.random() * 100) < this.criticalChance()) {
            crit = "(critical)";
            dmg *= 2;
        }

        console.log(this.name, "hits", tar.name, "for", dmg, crit);
        tar.getHit(dmg);

        let unit = this;
        this.timeout = setTimeout(function() {
            unit.attack();
        }, this.rechargeTime())
    }
}

var units = [];

for (let i = 0; i < 5; i++) {
    units.push(new Unit("unit" + i, 100));
}

for (let i = 0; i < units.length; i++) {
    units[i].attack();
}