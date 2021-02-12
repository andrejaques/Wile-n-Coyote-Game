const coiote = document.querySelector('.coiote');
const papaleguas = document.querySelector('.papaleguas');
const background = document.querySelector('.background');
let position = 10; // initial position or floor position.
let isJumping = false;

function handleKeyDown(event) 
{  
    if (event.keyCode === 32) 
    {
        if (!isJumping) // check
        {
            jump();
        }
    }
}

function jump() 
{
    

    isJumping = true;

    let upInterval = setInterval(() => 
    {
        if (position >= 225) // hight of jump
        {
            clearInterval(upInterval);

            // -------------------- Descendo / Going Down ---------------------
            let downInterval = setInterval(() => 
            {
                if (position <= 10) // floor position
                {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                else
                {
                    position -= 6.5; // speed of jumping
                    coiote.style.bottom = position + 'px';
                }
            })
        } 
        else 
        {
            // -------------------- Subindo / Going Up -------------------------
            position += 6.5; // speed of falling
            coiote.style.bottom = position +'px';
        }
    }, 10);
}

function createCactus()
{
    const cactus = document.createElement('div');
    let cactusPosition = 1500;
    let randomTime = Math.random() * 3000;

    cactus.classList.add('cactus');
    cactus.style.left = 1500 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() =>
    {
        if (cactusPosition < -60)
        {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }
        else if (cactusPosition > 0 && cactusPosition < 60 && position < 60)
        {
            // --------------------- Game Over -----------------------------
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Game Over</h1>';
        }
        else
        {
            cactusPosition -= 8; // cactus speed
            cactus.style.left = cactusPosition + 'px';
        }

    }, 10)

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', handleKeyDown);