var height;
var width;
var mine_num = 10;
var mines;
var kruci = new Audio("kruci.mp3");
var wygranko = new Audio("wygranko.mp3");
var first;
function numeruj(x,y)
{
    var nearby = 0;
    if(x-1 >= 0 && y-1 >= 0 && mines[x-1][y-1] == "b")
        nearby++;
    if(x-1 >= 0 && mines[x-1][y] == "b")
        nearby++;
    if(x-1 >= 0 && y+1 < height && mines[x-1][y+1] == "b")
        nearby++;
    if(y+1 < height && mines[x][y+1] == "b")
        nearby++;
    if(x+1 < width && y+1 < height && mines[x+1][y+1] == "b")
        nearby++;
    if(x+1 < width && mines[x+1][y] == "b")
        nearby++;
    if(x+1 < width && y-1 >= 0 && mines[x+1][y-1] == "b")
        nearby++;
    if(y-1 >= 0 && mines[x][y-1] == "b")
        nearby++;
    return nearby;
}
function odkryjPuste(x,y)
{
    if(x-1 >= 0 && y-1 >= 0 && mines[x-1][y-1] == "z")
    {
        mines[x-1][y-1] = "o";
        odkryjPuste(x-1,y-1);
    }
    if(x-1 >= 0 && mines[x-1][y] == "z")
    {
        mines[x-1][y] = "o";
        odkryjPuste(x-1, y);
    }
    if(x-1 >= 0 && y+1 < height && mines[x-1][y+1] == "z")
    {
        mines[x-1][y+1] = "o";
        odkryjPuste(x-1,y+1);
    }
    if(y+1 < height && mines[x][y+1] == "z")
    {
        mines[x][y+1] = "o";
        odkryjPuste(x,y+1);
    }
    if(x+1 < width && y+1 < height && mines[x+1][y+1] == "z")
    {   
        mines[x+1][y+1] = "o";
        odkryjPuste(x+1, y+1);
    }
    if(x+1 < width && mines[x+1][y] == "z")
    {
        mines[x+1][y] = "o";
        odkryjPuste(x+1, y);
    }
    if(x+1 < width && y-1 >= 0 && mines[x+1][y-1] == "z")
    {
        mines[x+1][y-1] = "o";
        odkryjPuste(x+1,y-1);
    }
    if(y-1 >= 0 && mines[x][y-1] == "z")
    {
        mines[x][y-1] = "o";
        odkryjPuste(x,y-1);
    }
    


    if(x-1 >= 0 && y-1 >= 0 && typeof(mines[x-1][y-1]) == "number")
    {
        sprawdz(x-1,y-1);
    }
    if(x-1 >= 0 && typeof(mines[x-1][y]) == "number")
    {
        sprawdz(x-1, y);
    }
    if(x-1 >= 0 && y+1 < height && typeof(mines[x-1][y+1]) == "number")
    {
        sprawdz(x-1,y+1);
    }
    if(y+1 < height && typeof(mines[x][y+1]) == "number")
    {
        sprawdz(x,y+1);
    }
    if(x+1 < width && y+1 < height && typeof(mines[x+1][y+1]) == "number")
    {   
        sprawdz(x+1, y+1);
    }
    if(x+1 < width && typeof(mines[x+1][y]) == "number")
    {
        sprawdz(x+1, y);
    }
    if(x+1 < width && y-1 >= 0 && typeof(mines[x+1][y-1]) == "number")
    {
        sprawdz(x+1,y-1);
    }
    if(y-1 >= 0 && typeof(mines[x][y-1]) == "number")
    {
        sprawdz(x,y-1);
    }

    document.getElementById(x+"_"+y).style.background = "#111111";
    document.getElementById(x+"_"+y).style.border = "border: solid 0.5px #00ff00;";
    document.getElementById(x+"_"+y).style.cursor = "default";
    document.getElementById(x+"_"+y).setAttribute("onclick",";");
    mines[x][y] = "o";
    var check = true;
        for(i = 0; i < width; i++)
            for(j = 0; j < height; j++)
                if(mines[i][j] != "o" && mines[i][j] != "b")
                {
                    check = false;
                    break;
                }
        if(check)
        {
            document.getElementById("gamefield").style.paddingLeft = "0px";
            document.getElementById("gamefield").innerHTML = "Wygranko!";
            wygranko.play();
        }
}
function plantMines()
{
        mines = new Array(width);
        for(i = 0; i < width; i++)
        {
            mines[i] = new Array(height);
            for(j = 0; j < height; j++)
                mines[i][j] = "z";
        }
        var num, x, y;
        for(i = 0; i < mine_num; i++)
        {
            num = 0;
            do
            {
                x = Math.floor(Math.random() * width);
                y = Math.floor(Math.random() * height);
            }
            while(mines[x][y] == "b");
            mines[x][y] = "b";
        }
                for(i = 0; i < width; i++)
            for(j = 0; j < height; j++)
                if(mines[i][j] != "b" && numeruj(i,j))
                    mines[i][j] = numeruj(i,j);
        var info = ""
        for(i = 0; i < width; i++)
        {
            for(j = 0; j < height; j++)
            {
                info += mines[i][j] + " ";
            }
            info+="\n";
        }
        //console.log(info);
}
function build()
{
    first = true;
    height = Math.floor(document.getElementById("input1").value);
    width = Math.floor(document.getElementById("input2").value);
    mine_num = Math.floor(document.getElementById("input3").value);
    if(height < 8 || width < 8)
    {
        document.getElementById("gamefield").innerHTML = "Plansza musi mieć wymiary przynajmniej 8 na 8!";
    }
    else if(height > 20 || width > 20)
    {
        document.getElementById("gamefield").innerHTML = "Plansza może mieć wymiary maksymalnie 20 na 20!";
    }
    else if(mine_num <= 0)
    {
        document.getElementById("gamefield").innerHTML = "Podano za małą ilość bomb!";
    }
    else if(mine_num > height*width/4)
    {
        document.getElementById("gamefield").innerHTML = "Bomb musi być mniej niż ćwierć pola!";
    }
    else
    {
        var pad_value = (window.screen.width - width*20)/2 + "px";
        document.getElementById("gamefield").style.paddingLeft = pad_value;
        var trescdiva = "";
        for(i = 0; i < width; i++)
        {
            for(j = 0; j < height; j++)
            {
                trescdiva += '<div class = "square" oncontextmenu="guess(' + i + ',' + j + '); return false;" onclick = "sprawdz(' + i + ',' + j + ')" id = "' + i + '_' + j + '">' + '</div>';
            }
            trescdiva += '<div style = "clear:both;"></div>';
        }
        document.getElementById("gamefield").innerHTML = trescdiva;
    }
}
function guess(i,j)
{
    if(mines[i][j] != "o")
        if(window.getComputedStyle(document.getElementById(i + "_" + j), null).getPropertyValue("background-color")  == "rgb(238, 0, 0)")
            document.getElementById(i + "_" + j).style.backgroundColor = "#AAAAAA";
        else
            document.getElementById(i + "_" + j).style.backgroundColor = "rgb(238, 0, 0)";
}
function sprawdz(x,y)
{
    if(first)
    {
        do
        {
            plantMines();
        }
        while(mines[x][y] != "z");
        first = false;
    }
    if(mines[x][y] == "b")
    {
        document.getElementById("gamefield").style.paddingLeft = "0px";
        document.getElementById("gamefield").innerHTML = "Koniec gry!";
        kruci.play();
    }
    else
    {
        nearby = numeruj(x,y);
        document.getElementById(x+"_"+y).innerHTML = nearby;
        switch(nearby)
        {
            case 0:
                document.getElementById(x+"_"+y).innerHTML = "";
                odkryjPuste(x,y);
                break;
            case 1:
                document.getElementById(x+"_"+y).style.color = "#29F587";
                break;
            case 2:
                document.getElementById(x+"_"+y).style.color = "#3D59D4";
                break;
            case 3:
                document.getElementById(x+"_"+y).style.color = "#DEF748";
                break;
            case 4:
                document.getElementById(x+"_"+y).style.color = "#D48C3D7";
                break;
            default:
                document.getElementById(x+"_"+y).style.color = "#EB50BC7";
                break;
            
        }
        document.getElementById(x+"_"+y).style.background = "#111111";
        document.getElementById(x+"_"+y).style.border = "border: solid 0.5px #00ff00;";
        document.getElementById(x+"_"+y).style.cursor = "default";
        document.getElementById(x+"_"+y).setAttribute("onclick",";");
        mines[x][y] = "o";
        var check = true;
        for(i = 0; i < width; i++)
            for(j = 0; j < height; j++)
                if(mines[i][j] != "o" && mines[i][j] != "b")
                {
                    check = false;
                    break;
                }
        if(check)
        {
            document.getElementById("gamefield").style.paddingLeft = "0px";
            document.getElementById("gamefield").innerHTML = "Wygranko!";
            wygranko.play();
        }
    }
}