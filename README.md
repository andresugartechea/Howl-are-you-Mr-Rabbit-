# Howl Are You, Mr. Rabbit? 
# Documentation
[_Code Link_](https://github.com/andresugartechea/Project2.git)</br>
[_Website Link_](www.google.com)

## Description: 

“Howl Are You, Mr. Rabbit?” is a two-player online game displayed on a website inspired by the Pacman and the traditional game of tag. The user enters the website to see a portal where they can create a new room to start a match with another player and enter a username of their choice or join a room created by someone else by clicking on a leaf. The user enters the room to see the instructions for the game and start playing. They have the option to be either a wolf, who needs to hunt the rabbit before it eats all the food in the forest, or be the rabbit that needs to escape from the wolf. 

## Final idea inspiration:
Our final website consisted of two parts:
- An entry page with animations and a new user interface to joining and creating rooms.
- The Pakman game using the created rooms
Most websites with rooms, u just use have an average landing page that looks something like this:
<img src=“./images/fatema/image1.png” style=“width:300px”>

Our goal was to create a landing page that is more interesting and creative to the user, a page that adds to the their experience and for them to have a little bit more fun in our website beyond the pacman game.

## Next Steps:
> Ps. I am still not sure about, ifs and whens of these ideas, but these were things we had discussed. Incase we decide to go further this is what we plan on adding.
### expansion Ideas: 
1. More games for the user to play. This would use name spaces and randomly choose a game for the user the second they “create a room”. Games would be like skribble, *initial game idea*, snake, and …etc.
2. Work on the interface, maybe show the game name next to each leaf.
3. Work on a design that is all similar, pixilated, kinda like an old game vibe in a modern world.
### Technical ideas:
- Work on socket connections
- Add more details on game screen about different users
- Give the user more intuitively and less instructions for the game.\

## Fatema

### Description:
I created an interactive landing page for pakman where new user had to choose whether to create a room or join a room. 
If user creates a room they are automatically redirected to that room, and if they  want to join a room, they have to enter their name then choose the leaf for which room they want to join. As they click on the leaf they are redirected to the room name stored in the leaf object.

### Process:

#### Evolution of the concept:
When I first came up with my idea I was planning on something fairly similar to the final result, only I did not keep in mind that we had a week to finish and my part was not that easy to figure out.
I was planning on creating an installation style landing page with either a:
- Simple creative game or connection in the second part of the website
- Or a user input details about themselves and others view it on leaf hover, something like paper planets but more interactive and simpler.
At the beginning, my part of the project had the same setup, but it was a “high resolution” verison of it. 
> i say high resolution between quotes because the low resolution was on purpose.

When I started working with Andres, we wanted to have a similar theme to both parts of the project. So I changed my design to a low pixelated version that gives an old computer vibe just like packman and all the other old computer games.
I also pixelated the leaves I had, and now that I look at it I think it may have used a little bit more pixelation (larger shapes for pixels).
Then i decided to keep my idea of the game but with his game instead.
First background Image looked like this:
<img src=“./images/fatema/image2.png” style=“width:300px”>
Final result:
<img src=“./images/fatema/image3.png” style=“width:300px”>

#### Wireframe and concept:
For the wire frame, I did not change much throughout the process. 

Here is my initial wire frame:
<img src=“./images/fatema/image4.png” style=“width:300px”>
<img src=“./images/fatema/image5.png” style=“width:300px”>
<img src=“./images/fatema/image6.png” style=“width:300px”>

### Major challenges and solutions:
1. My main challenge was time. I had thought initially that I can finish so much more than what I could’ve in the time that we had, that’s why working with Andres helped both of us a lot, as it helped me with what i couldn’t finish and him with finding and creating a new theme that was not copying anyone or anything but his own thought process.
2. My second biggest challenge was that, as a form of exploration, I decided to start by not using `p5.js` for my animation. With sockets however, and generally javascript not being the fastest or the friendliest in displaying new elements, it did not work the way I wanted it to. Even getting it to work was a lot more complicated than I had anticipated. So I decided to change it to p5.js to have a smoother flow and a lot more controle over the leaf movement
  initial process:
  - recursive function to act like draw loop
  ```
  timer = () => {
        socket.emit('newPos', n);
        this.my_time = setTimeout(this.timer, 500);
  }
  ```
  - display loop updates `top` or `left` style of element:
  ```
  if (this.loc.y >= this.g) {
            this.step.y = 0;

            // this.end = true;
        } else {
            this.step.y = 2;
        }
        this.loc.y += this.step.y;
        socket.emit('newPos', this);

        this.div_cont.style.top = this.loc.y + "px";

        this.div_cont.style.left = this.loc.x + "px";
        if (this.end) {
            this.reset();
        }
  ```
3. Third, and last of my main worries, was the socket integration between both pages. As much as creating and sending information was fine, I could not figure out how to choose a player one and a player 2 from the main page.
    1. My idea was (still is) to let the first user enter room details and second user to join by pressing on a falling leaf.
    2. I finally figured it out by separating the the create room and join room instructions and saving a boolean variable `create0_join1 = 1/*or*/0;` each time the user clicks on the create room or join room buttons respectively. That way made it easier to determine the first player from the second player as the window location change was faster than the time it took to set the variable difference.
    solution:
    ```
     document.getElementById('joinn').addEventListener('click', () => {
        if (leavesObj.length > 0) {
            document.getElementById("join_form_div").style.display = "none";
            document.getElementById("main_form_div").style.display = "block";
            create0_join1 = 1;
        } else {
            document.getElementById("join_form_div").style.display = "none";
            document.getElementById("joinerror").style.display = "block";
            document.getElementById("main_form_div").style.display = "block";
            document.getElementById("room").style.display = "block";
            create0_join1 = 0;
        }

    })
    document.getElementById('create').addEventListener('click', () => {
        document.getElementById("join_form_div").style.display = "none";
        document.getElementById("main_form_div").style.display = "block";
        document.getElementById("room").style.display = "block";
        create0_join1 = 0;
    })
    ```
That being said, I faced a lot more little struggles here and there, but those were my biggest ones.


## Andres
### Process:

#### Evolution of the concept: 

My first draft idea was to develop my own version of Skribbl, which is an online game that my friends and I find very entertaining. Nonetheless, I considered that this idea wouldn’t allow me to push my creative and coding skills the way I wanted. For this reason, I decided to move to my second idea, which is to recreate the game of tag on a virtual platform. The game would consist of a player chasing another one by moving the key arrows, having features like the ability to increase the speed and eating items to gain points. This new concept seemed similar to the Pacman videogame, so I found it interesting to try to combine its aesthetics with the concept of my game. 

In the beginning, I was working on my own but I started collaborating with Fatema Nassar when we realized that our creative concepts could go along very well. Her animations of leaves falling down gave the forest theme of this game and gave birth to “HAYMR?”. 

#### Wireframe and concept:

For my part of the project, which was the page showing the video, I followed this wireframe. 

The concept of this game, as I mentioned before, was to create a virtual version of the tag game. It evolved in a Pacman inspired videogame where the user is allowed to control either the ‘ghost’ (or a wolf in this case) or the ‘pacman’ (or a rabbit). In addition, my personal purpose for this game was to push myself by making a videogame, something that is out of my comfort zone. 

### Major challenges and solutions:

I encountered multiple challenges in this project that pushed me to gain more coding skills and reinforced the ones I learned in class. For instance, coding a videogame is something that I had done in previous classes, so this assignment was a good occasion to practice my lessons. In the first version of my work, I had used a lot of iterations (‘for’ loops) and the my professor recommended me to build on a Grid class that she had previously coded. Studying her code opened my mind in the sense that I helped me unblock a logic that I hadn’t used before while making a videogame.

After restarting my project basing it on my professor’s code and understanding the new logic behind it, the next challenge that I encountered was to apply inheritance in my classes. This is something I had struggled with in the past when I coded for the first time. Thanks to the Coding Train’s tutorial on Javascript, I could apply this fundamental concept of programming in my videogame and saved some lines of code. 

Furthermore, another challenge that I encountered was to combine Fatema Nassar’s part with mine, which took us a couple of days to figure out. 



Finally, the last challenge that got me so stressed and I couldn’t solve was to send data from one user to another. 


## The Unified Final Result
> (aka. masterpiece even if it does not work as we had hoped.)
In the beginning, I was working on my own but I started collaborating with Fatema Nassar when we realized that our creative concepts could go along very well. Her animations of leaves falling down gave the forest theme of this game and gave birth to “HAYMR?”. 
