class Commander {
    constructor(coinBonusMult = 0) {
        this.Name = "Commander";
        this.Level = 0;
        this.BaseUpCost = 100;
        this.MultFactor = 1.9;
        this.CoinBonusMultiplier = coinBonusMult;

        this.RepP = null;
        this.LevelP = null;
        this.TimeP = null;
        this.CostP = null;

        this.cost = function () {
            return Math.round(this.BaseUpCost * Math.pow(this.MultFactor, this.Level));
        };
        this.updateTab = function () {
            var rx = /(\d+)(\d{3})/;
            if (this.LevelP == null) {
                this.LevelP = document.getElementById("CommanderLevel");
            }
            this.LevelP.innerHTML = format(this.Level);
            if (this.RepP == null) {
                this.RepP = document.getElementById("CommanderRep");
            }
            this.RepP.innerHTML = format(this.Reputation());
            if (this.TimeP == null) {
                this.TimeP = document.getElementById("CommanderCurrentTime");
            }
            this.TimeP.innerHTML = this.Reputation() > 0 ? "Current time: " + formatMins(this.currentTime() * 60) : "Your Commander has no reputation so he can't command your army.";
            if (this.CostP == null) {
                this.CostP = document.getElementById("CommanderCurrentCost");
            }
            if (this.cost() >= coins) {
                this.CostP.style.color = "#dd0000";
            }
            else {
                this.CostP.style.color = "#1e9231";
            }
            this.CostP.innerHTML = format(this.cost());
        };
        this.currentTime = function () {
            return Math.round(Math.log10(this.Reputation()) * 100) / 250;
        };
        this.Reputation = function () {
            var r = 5 * Math.pow(1.3, this.Level);
            if (r > 100 || r < -100) {
                return Math.round(r / 10) * 10;
            }
            return r;
        };
        this.upgrade = function () {
            if (coins >= this.cost()) {
                coins -= this.cost();
                this.Level++;
            }
        };

        this.ClickBonus = function(){
            return 1 + this.CoinBonusMultiplier * this.Level;
        };
    }
}