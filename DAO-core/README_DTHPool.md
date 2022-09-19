# DTHPool contract

![DTHPool](http://i.imgur.com/2vUP8tE.png)

The DTHPool contract allows a DTH to lend their DAO Tokens to a delegate in order to vote in his name without losing the control of his DAO tokens.

## Normal procedures

### Delegate the votes.

To delegate the votes the DTH needs to call these two functions in two separated transactions:

    1. DAO.approve(DTHPoolAdress, [amount of Ð that you want to delegate])
    2. DTHPool.delegateDAOTokens([amount Ð that you want to delegate])

Once the delegation is finished, you will exchange normal DAO tokens ( Ð ) by the same
number of delegate dao tokens ( dÐ ) .

It is convenient that in mist you watch both contracts and both tokens.

### Undelegate the votes

To undelegate the vote the DTH just call:

    DTHPool.undelegateDAOTokens([amount Ð that you want to undelegate])

The DTH will be able to undelegate and so restore his original DAO tokens at any time except in the last moments before the voting period of each proposal.

### Voting mecanism

When a new regular proposal is made to the DAO, the delegate can set his voting intention.

    setVoteIntention(
        uint _proposalID,
        bool _willVote,
        bool _supportsProposal,
        string _motivation
    )

* **_proposalID**: the proposal that wants to set the position for.
* **_willVote**: true if this contract will vote to this proposa.
* **_supportsProposal**: true if it will vote to accept the proposal and false if it will not accept.
* **_motivation** free text where the delegate can explain why he set this position.

The delegate can not vote in split proposals.

The vote will not effectivelly send the vote to the DAO until the last moment before the
debatingPeriod closes.

In the testing DTHPool this parameter is set to 2 minutes.

The contract will make the vote automatically, no action is needed by the user.

### Query the delegate positions.

Users can query the delegate position of any proposal by calling:

    DTHPool.proposalStatuses(proposalId)


## Test and practice

In order to test and practice with DTHPool contract, I just deployed a test DAO contract and DTHPool contract in the test net.

* DAO address: 0x0b1aef3ea19bd816e689b7a2a373459170bd8e6e
* DTHPool address: 0x840b7ac7deb5b7441921568a3baa3572e638fecd

Feel free to contact me ( @jbaylina ) or any member in the #art_of_the_dao channel in thedao.slack.com

You can get an free invitation here: http://slack.slock.it:3000/

There you can get testDAOs, testEther, support and love ;)

## Q&A

Q: What happens if somebody sends the DAO tokens directly to the contract?

A: If the delegate is a nice guy, he can return them back to the clumsy DTH. The delegate may call fixTokens() to return those tokens back to the sender.

---
Q: I want to be a delegate. How can I deploy my own contract?

A: You just deploy the DTHPool with the following parameters in the constructor:

* _daoAddress : The Address of the DAO token smart contract -- 0xbb9bc244d798123fde783fcc1c72d3bb8c189413 is TheDAO's
* _delegate : Your own address (If you are the delegate)
* _maxTimeBlocked : Time in seconds before the debate closing time when the vote will be triggered automatically.
* _delegateName : Your name (optional string)
* _delegateUrl : A URL for more information about yourself (optional string)
* _tokenSymbol : Symbol for your delegate tokens. Example jbÐ

**IMPORTANT:** The automatic timer call in _maxTimeBlocked is done via Oraclize service, so it is important that during the construct or in another transaction after the construction you send some ether to this contract.

---
Q: Can a delegate change his vote intention?

A: NO. They are free to change and communicate any details up until the moment before setting their intention; but, once set it cannot be changed.

---
Q: How can a user vote different that his delegate?

A: He must first undelegate his tokens by calling undelegateDAOTokens then cast his vote directly to the DAO. After the voting period ends for that proposal, he is able to safely delegate back his tokens.

---
Q: Can the delegate tokens be transfered?

A: Yes, like any other token.

